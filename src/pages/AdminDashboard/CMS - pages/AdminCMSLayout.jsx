import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminCMSLayout = ({ title, actions, children }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        {actions}
      </div>

      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminCMSLayout;
