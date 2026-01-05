import { useNavigate } from 'react-router-dom';
import { FiHelpCircle, FiFileText } from 'react-icons/fi';

const CMSCard = ({ title, description, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-left p-6 rounded-xl border border-bg-elevated bg-bg-surface hover:bg-bg-elevated transition group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-lg bg-brand-primary/10 text-brand-primary">
          <Icon size={22} />
        </div>
        <h3 className="font-semibold text-base">{title}</h3>
      </div>

      <p className="text-sm text-text-muted">{description}</p>

      <p className="mt-4 text-sm text-brand-primary group-hover:underline">
        Manage →
      </p>
    </button>
  );
};

const AdminPagesHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Content Management</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CMSCard
          title="Pages"
          description="Manage static site pages like About, Terms, Privacy, etc."
          icon={FiFileText}
          onClick={() => navigate('/admin/cms/pages')}
        />

        <CMSCard
          title="FAQs"
          description="Manage frequently asked questions shown on the website."
          icon={FiHelpCircle}
          onClick={() => navigate('/admin/cms/faqs')}
        />
      </div>
    </div>
  );
};

export default AdminPagesHome;
