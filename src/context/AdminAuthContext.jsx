import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminAuthContext } from './adminAuthContextValue';
import { adminAuthApi, setAdminAccessToken } from '../services/adminApi';

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState('checking');

  const setSession = useCallback((token, nextUser) => {
    setAdminAccessToken(token);
    setAccessToken(token || null);
    setUser(nextUser || null);
    setStatus(token ? 'authenticated' : 'unauthenticated');
  }, []);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      if (window.location.pathname === '/dashboard/login') {
        setSession(null, null);
        return;
      }

      try {
        const refreshed = await adminAuthApi.refresh();

        if (!isMounted || !refreshed.accessToken) {
          if (isMounted) setSession(null, null);
          return;
        }

        setAdminAccessToken(refreshed.accessToken);
        const profile = refreshed.user?.email ? refreshed.user : await adminAuthApi.me();

        if (isMounted) {
          setSession(refreshed.accessToken, profile);
        }
      } catch {
        if (isMounted) setSession(null, null);
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [setSession]);

  const login = useCallback(async (credentials) => {
    const session = await adminAuthApi.login(credentials);

    if (!session.accessToken) {
      throw new Error('Login succeeded, but no access token was returned.');
    }

    setAdminAccessToken(session.accessToken);
    const profile = session.user?.email ? session.user : await adminAuthApi.me();
    setSession(session.accessToken, profile);
    return profile;
  }, [setSession]);

  const logout = useCallback(async () => {
    try {
      await adminAuthApi.logout();
    } finally {
      setSession(null, null);
    }
  }, [setSession]);

  const changePassword = useCallback((values) => adminAuthApi.changePassword(values), []);

  const value = useMemo(() => ({
    user,
    status,
    accessToken,
    login,
    logout,
    changePassword,
  }), [accessToken, changePassword, login, logout, status, user]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
