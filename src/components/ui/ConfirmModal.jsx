import { FiX } from 'react-icons/fi';

const ConfirmModal = ({
  open,
  title = 'Confirm action',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-bg-surface border border-bg-elevated rounded-2xl p-6 shadow-xl">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main"
        >
          <FiX />
        </button>

        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {description && (
          <p className="text-sm text-text-muted mb-6">{description}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-bg-elevated rounded-lg py-2 text-sm hover:bg-bg-elevated"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${
              danger
                ? 'bg-status-danger text-text-primary hover:bg-status-danger/80'
                : 'bg-brand-primary text-bg-main hover:bg-brand-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
