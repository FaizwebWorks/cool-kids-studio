import { useContext } from 'react';
import { AdminAuthContext } from '../context/adminAuthContextValue';

export const useAdminAuth = () => useContext(AdminAuthContext);
