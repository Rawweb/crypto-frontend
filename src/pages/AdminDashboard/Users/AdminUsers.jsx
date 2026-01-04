import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@api/axios';

import AdminTable from '@pages/AdminDashboard/Dashboard/Components/AdminTable';
import AdminSkeleton from '@pages/AdminDashboard/Dashboard/Components/AdminSkeleton';
import ConfirmModal from '@components/ui/ConfirmModal';
import Pagination from '@pages/AdminDashboard/Dashboard/Components/Pagination';
import BulkActionBar from '@pages/AdminDashboard/Dashboard/Components/BulkActionBar';
import UserDrawer from '@pages/AdminDashboard/Dashboard/Components/UserDrawer';

/* ---------------- status badge ---------------- */

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-green-500/10 text-green-500',
    suspended: 'bg-yellow-500/10 text-yellow-500',
    banned: 'bg-red-500/10 text-red-500',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        styles[status] || 'bg-bg-elevated text-text-muted'
      }`}
    >
      {status}
    </span>
  );
};

/* ---------------- component ---------------- */

const AdminUsers = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const openUserId = params.get('open');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* filters */
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  /* pagination */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* actions */
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  /* drawer */
  const [viewUser, setViewUser] = useState(null);

  /* bulk */
  const [selectedIds, setSelectedIds] = useState([]);

  /* ---------------- debounce search ---------------- */

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput);
    }, 400);

    return () => clearTimeout(t);
  }, [searchInput]);

  /* ---------------- fetch users ---------------- */

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get('/admin/users', {
        params: {
          page,
          limit: 20,
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        },
      });

      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, searchQuery, statusFilter]);

  /* ---------------- auto-open drawer from URL ---------------- */

  useEffect(() => {
    if (!openUserId || !users.length) return;

    const userToOpen = users.find(u => u._id === openUserId);
    if (userToOpen) {
      setViewUser(userToOpen);
    }
  }, [openUserId, users]);

  /* ---------------- close drawer properly ---------------- */

  const closeDrawer = () => {
    setViewUser(null);
    window.history.replaceState({}, '', '/admin/users');
  };

  /* ---------------- single user action ---------------- */

  const handleAction = async () => {
    if (!selectedUser || !actionType) return;

    setActionLoading(true);

    try {
      let endpoint = '';

      if (actionType === 'active') endpoint = 'unsuspend';
      if (actionType === 'suspended') endpoint = 'suspend';
      if (actionType === 'banned') endpoint = 'ban';

      if (actionType === 'delete') {
        await api.delete(`/admin/users/${selectedUser._id}/delete`);
        setUsers(prev => prev.filter(u => u._id !== selectedUser._id));
        return;
      }

      const res = await api.put(
        `/admin/users/${selectedUser._id}/${endpoint}`
      );

      setUsers(prev =>
        prev.map(u =>
          u._id === selectedUser._id
            ? { ...u, status: res.data.user.status }
            : u
        )
      );
    } catch {
      alert('Action failed');
    } finally {
      setActionLoading(false);
      setSelectedUser(null);
      setActionType(null);
    }
  };

  /* ---------------- states ---------------- */

  if (loading) return <AdminSkeleton showTable />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">No Users</h1>

        <div className="rounded-xl border border-status-info/20 bg-status-info/10 p-6 text-center">
          <p className="text-sm font-medium text-status-info">
            No registered users
          </p>
          <p className="text-xs text-text-muted mt-1">
            No users have been registered yet on the platform.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- table columns ---------------- */

  const columns = [
    {
      key: 'select',
      label: '',
      render: u => (
        <input
          type="checkbox"
          checked={selectedIds.includes(u._id)}
          onChange={e => {
            setSelectedIds(prev =>
              e.target.checked
                ? [...prev, u._id]
                : prev.filter(id => id !== u._id)
            );
          }}
        />
      ),
    },
    {
      key: 'email',
      label: 'User',
      render: u => (
        <button
          onClick={() => {
            setViewUser(u);
            window.history.replaceState(
              {},
              '',
              `/admin/users?open=${u._id}`
            );
          }}
          className="text-left hover:underline"
        >
          <div className="flex flex-col">
            <span className="font-medium">{u.email}</span>
            <span className="text-xs text-text-muted">@{u.username}</span>
          </div>
        </button>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: u => u.role || 'user',
    },
    {
      key: 'status',
      label: 'Status',
      render: u => <StatusBadge status={u.status} />,
    },
    {
      key: 'created',
      label: 'Joined',
      render: u => new Date(u.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: u => (
        <div className="flex gap-2">
          {u.status !== 'active' && (
            <button
              onClick={() => {
                setSelectedUser(u);
                setActionType('active');
              }}
              className="px-3 py-1 text-xs rounded bg-green-500/10 text-green-500"
            >
              Activate
            </button>
          )}

          {u.status !== 'suspended' && (
            <button
              onClick={() => {
                setSelectedUser(u);
                setActionType('suspended');
              }}
              className="px-3 py-1 text-xs rounded bg-yellow-500/10 text-yellow-500"
            >
              Suspend
            </button>
          )}

          {u.status !== 'banned' && (
            <button
              onClick={() => {
                setSelectedUser(u);
                setActionType('banned');
              }}
              className="px-3 py-1 text-xs rounded bg-red-500/10 text-red-500"
            >
              Ban
            </button>
          )}
        </div>
      ),
    },
  ];

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Users</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by email or username"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-64"
        />

        <select
          value={statusFilter}
          onChange={e => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Bulk actions */}
      <BulkActionBar
        count={selectedIds.length}
        onAction={async status => {
          await api.post('/admin/users/bulk-update', {
            userIds: selectedIds,
            status,
          });

          setUsers(prev =>
            prev.map(u => (selectedIds.includes(u._id) ? { ...u, status } : u))
          );

          setSelectedIds([]);
        }}
      />

      {/* Table */}
      <AdminTable columns={columns} data={users} />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {/* Drawer */}
      <UserDrawer user={viewUser} onClose={closeDrawer} />

      {/* Confirm modal */}
      <ConfirmModal
        open={!!selectedUser}
        title={`${actionType} user`}
        description={`Are you sure you want to ${actionType} this user?`}
        confirmText="Confirm"
        danger={actionType === 'banned' || actionType === 'delete'}
        loading={actionLoading}
        onCancel={() => setSelectedUser(null)}
        onConfirm={handleAction}
      />
    </div>
  );
};

export default AdminUsers;
