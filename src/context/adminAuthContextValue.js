import { createContext } from 'react';

export const AdminAuthContext = createContext({
  user: null,
  status: 'checking',
  accessToken: null,
  login: async () => {},
  logout: async () => {},
  changePassword: async () => {},
});
