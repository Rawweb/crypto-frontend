import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@api/axios';
import AdminCMSLayout from './AdminCMSLayout';

const AdminPageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    slug: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (!isEdit) return;

    api.get('/pages/admin/all').then(res => {
      const page = res.data.find(p => p._id === id);
      if (page) {
        setForm({
          slug: page.slug,
          title: page.title,
          content: page.content,
        });
      }
    });
  }, [id]);

  const saveDraft = async () => {
    await api.post('/pages/admin/draft', form);
    navigate('/admin/cms/pages');
  };

  return (
    <AdminCMSLayout
      title={isEdit ? 'Edit Page' : 'New Page'}
      actions={
        <button
          onClick={saveDraft}
          className="px-4 py-2 rounded bg-brand-primary text-white"
        >
          Save Draft
        </button>
      }
    >
      <div className="space-y-4 max-w-3xl">
        <input
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          placeholder="slug (e.g. privacy-policy)"
          className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />

        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Page title"
          className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />

        <textarea
          rows={12}
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          placeholder="Page content (HTML supported)"
          className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
        />
      </div>
    </AdminCMSLayout>
  );
};

export default AdminPageEditor;
