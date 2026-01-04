import { useEffect, useState } from 'react';
import api from '@api/axios';

import AdminTable from '@pages/AdminDashboard/Dashboard/Components/AdminTable';
import AdminSkeleton from '@pages/AdminDashboard/Dashboard/Components/AdminSkeleton';
import ConfirmModal from '@components/ui/ConfirmModal';

/* ==============================
   Create / Edit Plan Modal
============================== */

const PlanModal = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    name: '',
    minAmount: '',
    maxAmount: '',
    roi: '',
    roiType: 'daily',
    durationDays: '',
    maxMultiplier: 3,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        minAmount: initialData.minAmount || '',
        maxAmount: initialData.maxAmount || '',
        roi: initialData.roi || '',
        roiType: initialData.roiType || 'daily',
        durationDays: initialData.durationDays || '',
        maxMultiplier: initialData.maxMultiplier || 3,
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = () => {
    onSave({
      ...form,
      minAmount: Number(form.minAmount),
      maxAmount: Number(form.maxAmount),
      roi: Number(form.roi),
      durationDays: Number(form.durationDays),
      maxMultiplier: Number(form.maxMultiplier),
    });
  };



  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <aside className="w-full sm:w-105 bg-bg-surface border-l border-bg-elevated p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? 'Edit Investment Plan' : 'Create Investment Plan'}
        </h2>

        <div className="space-y-4 text-sm">
          <input
            placeholder="Plan name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Min amount"
              type="number"
              value={form.minAmount}
              onChange={e => setForm({ ...form, minAmount: e.target.value })}
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            />
            <input
              placeholder="Max amount"
              type="number"
              value={form.maxAmount}
              onChange={e => setForm({ ...form, maxAmount: e.target.value })}
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="ROI (%)"
              type="number"
              value={form.roi}
              onChange={e => setForm({ ...form, roi: e.target.value })}
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            />

            <select
              value={form.roiType}
              onChange={e => setForm({ ...form, roiType: e.target.value })}
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Duration (days)"
              type="number"
              value={form.durationDays}
              onChange={e => setForm({ ...form, durationDays: e.target.value })}
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            />

            <input
              placeholder="Max multiplier"
              type="number"
              value={form.maxMultiplier}
              onChange={e =>
                setForm({ ...form, maxMultiplier: e.target.value })
              }
              className="bg-bg-main border border-bg-elevated rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full px-4 py-2 rounded bg-brand-primary text-white"
        >
          {initialData ? 'Save Changes' : 'Create Plan'}
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-text-muted hover:underline"
        >
          Cancel
        </button>
      </aside>
    </div>
  );
};

/* ==============================
   Admin Investment Plans Page
============================== */

const AdminInvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

    const PlanStatusBadge = ({ active }) => (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      }`}
    >
      {active ? 'Active' : 'Disabled'}
    </span>
  );

  const loadPlans = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/investment-plans');
      setPlans(res.data || []);
    } catch {
      setError('Failed to load investment plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const savePlan = async data => {
    try {
      if (editingPlan) {
        await api.put(`/admin/investment-plans/${editingPlan._id}`, data);
      } else {
        await api.post('/admin/investment-plans', data);
      }

      setShowModal(false);
      setEditingPlan(null);
      loadPlans();
    } catch {
      alert('Failed to save plan');
    }
  };

  const deletePlan = async () => {
    try {
      await api.delete(`/admin/investment-plans/${confirmDelete._id}`);
      setConfirmDelete(null);
      loadPlans();
    } catch {
      alert('Failed to delete plan');
    }
  };

  if (loading) return <AdminSkeleton showTable />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  const columns = [
    {
      key: 'name',
      label: 'Plan',
      render: p => p.name,
    },
    {
      key: 'amount',
      label: 'Amount Range',
      render: p => `$${p.minAmount} – $${p.maxAmount}`,
    },
    {
      key: 'roi',
      label: 'ROI',
      render: p => `${p.roi}% (${p.roiType})`,
    },
    {
      key: 'duration',
      label: 'Duration',
      render: p => `${p.durationDays} days`,
    },
    {
      key: 'multiplier',
      label: 'Max Multiplier',
      render: p => `${p.maxMultiplier}x`,
    },
    {
      key: 'status',
      label: 'Status',
      render: p => <PlanStatusBadge active={p.isActive} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: p => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingPlan(p);
              setShowModal(true);
            }}
            className="text-sm text-brand-primary hover:underline"
          >
            Edit
          </button>

          <button
            onClick={async () => {
              await api.put(`/admin/investment-plans/${p._id}/toggle`);

              setPlans(prev =>
                prev.map(pl =>
                  pl._id === p._id ? { ...pl, isActive: !pl.isActive } : pl
                )
              );
            }}
            className={`text-sm hover:underline ${
              p.isActive ? 'text-status-danger' : 'text-status-success'
            }`}
          >
            {p.isActive ? 'Disable' : 'Enable'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Investment Plans</h1>

        <button
          onClick={() => {
            setEditingPlan(null);
            setShowModal(true);
          }}
          className="px-4 py-2 rounded bg-brand-primary text-white"
        >
          Create Plan
        </button>
      </div>

      <AdminTable columns={columns} data={plans} />

      <PlanModal
        open={showModal}
        initialData={editingPlan}
        onClose={() => {
          setShowModal(false);
          setEditingPlan(null);
        }}
        onSave={savePlan}
      />

      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Investment Plan"
        description="This action cannot be undone. Are you sure?"
        confirmText="Delete"
        danger
        onCancel={() => setConfirmDelete(null)}
        onConfirm={deletePlan}
      />
    </div>
  );
};

export default AdminInvestmentPlans;
