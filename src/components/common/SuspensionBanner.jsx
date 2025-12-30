import { FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '@context/AuthContext';

const SuspensionBanner = () => {
  const { isSuspended } = useAuth();

  if (!isSuspended) return null;

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2">
      <FiAlertTriangle className='hidden md:block' />
      <p className="text-sm ">
        Your account is temporarily suspended. Some actions are disabled.
      </p>
    </div>
  );
};

export default SuspensionBanner;
