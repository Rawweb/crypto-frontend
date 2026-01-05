import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import AdminCMSLayout from './AdminCMSLayout';

const FaqSkeleton = () => (
  <div className="py-4 flex justify-between gap-4 animate-pulse">
    <div className="space-y-2 w-3/4">
      <div className="h-4 bg-bg-elevated rounded w-full" />
      <div className="h-3 bg-bg-elevated rounded w-24" />
    </div>
    <div className="flex gap-3">
      <div className="h-4 w-10 bg-bg-elevated rounded" />
      <div className="h-4 w-14 bg-bg-elevated rounded" />
    </div>
  </div>
);

const AdminFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [previewId, setPreviewId] = useState(null);

  const navigate = useNavigate();

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/faqs/admin/all', {
        params: { status: status === 'all' ? undefined : status },
      });
      setFaqs(res.data);
    } catch (err) {
      console.error('Failed to load FAQs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, [status]);

  const sortedFaqs = [...faqs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <AdminCMSLayout
      title="FAQs"
      actions={
        <button
          onClick={() => navigate('/admin/cms/faqs/new')}
          className="px-4 py-2 rounded bg-brand-primary text-white"
        >
          New FAQ
        </button>
      }
    >
      {/* filters */}
      <div className="mb-4 flex gap-2">
        {['all', 'draft', 'published'].map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded text-sm ${
              status === s
                ? 'bg-brand-primary text-white'
                : 'border border-bg-elevated'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* list */}
      <div className="divide-y divide-bg-elevated">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <FaqSkeleton key={i} />)}

        {!loading &&
          sortedFaqs.map(faq => (
            <div key={faq._id} className="py-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-medium">{faq.question}</p>
                  <div className="flex gap-2 mt-1 items-center">
                    <span className="text-xs text-text-muted uppercase">
                      {faq.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated">
                      #{faq.order ?? 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => navigate(`/admin/cms/faqs/${faq._id}/edit`)}
                    className="hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setPreviewId(prev => (prev === faq._id ? null : faq._id))
                    }
                    className="hover:underline"
                  >
                    Preview
                  </button>

                  {faq.status === 'draft' && (
                    <button
                      onClick={async () => {
                        await api.put(`/faqs/admin/${faq._id}/publish`);
                        loadFaqs();
                      }}
                      className="text-green-500"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      if (!confirm('Delete this FAQ?')) return;
                      await api.delete(`/faqs/admin/${faq._id}/delete`);
                      loadFaqs();
                    }}
                    className="text-status-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* preview */}
              {previewId === faq._id && (
                <div className="mt-3 rounded-lg border border-bg-elevated bg-bg-main p-4 text-sm text-text-muted">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
      </div>
    </AdminCMSLayout>
  );
};

export default AdminFaqs;
