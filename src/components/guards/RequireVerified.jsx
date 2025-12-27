import { Navigate } from 'react-router-dom';

const RequireVerified = ({ user, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (!user.isVerified) return <Navigate to="/verify-email" />;
  return children;
};

export default RequireVerified;
