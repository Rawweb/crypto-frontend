import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@api/axios';
import AdminCMSLayout from './AdminCMSLayout';

const AdminFaqEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: '',
    answer: '',
    order: 0,
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!isEdit) return;

    api.get('/faqs/admin/all').then(res => {
      const faq = res.data.find(f => f._id === id);
      if (faq) {
        setForm({
          question: faq.question,
          answer: faq.answer,
          order: faq.order || 0,
        });
      }
    });
  }, [id]);

  const saveDraft = async () => {
    if (isEdit) {
      await api.put(`/faqs/admin/${id}/draft`, form);
    } else {
      await api.post('/faqs/admin/draft', form);
    }
    navigate('/admin/cms/faqs');
  };

  return (
    <AdminCMSLayout
      title={isEdit ? 'Edit FAQ' : 'New FAQ'}
      actions={
        <button
          onClick={saveDraft}
          className="px-4 py-2 rounded bg-brand-primary text-white"
        >
          Save Draft
        </button>
      }
    >
      <div className="space-y-4 max-w-2xl">
        <input
          value={form.question}
          onChange={e =>
            setForm({ ...form, question: e.target.value })
          }
          placeholder="Question"
          className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />

        <textarea
          rows={6}
          value={form.answer}
          onChange={e =>
            setForm({ ...form, answer: e.target.value })
          }
          placeholder="Answer"
          className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />

        <input
          type="number"
          value={form.order}
          onChange={e =>
            setForm({ ...form, order: Number(e.target.value) })
          }
          placeholder="Order"
          className="w-32 bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />
      </div>
    </AdminCMSLayout>
  );
};

export default AdminFaqEditor;
