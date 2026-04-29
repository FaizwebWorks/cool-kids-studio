import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import { FullPageLoader } from './DashboardUI';

export const ProtectedDashboard = ({ children }) => {
  const { status } = useAdminAuth();
  const location = useLocation();

  if (status === 'checking') {
    return <FullPageLoader label="Checking secure session" />;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/dashboard/login" replace state={{ from: location }} />;
  }

  return children;
};
