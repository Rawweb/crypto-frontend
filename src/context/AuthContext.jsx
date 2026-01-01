import { createContext, useContext, useEffect, useState } from 'react';
import api from '@api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSuspended = user?.status === 'suspended';
  const isBanned = user?.status === 'banned';

  // hydrate auth on app load
  useEffect(() => {
    const hydrateAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch {
        // invalid or expired token
        // ignore
        // wait for interceptor to refresh
      } finally {
        setLoading(false);
      }
    };

    hydrateAuth();
  }, []);

  // 🔹 central login - owns token
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // 🔹 central logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // 🔹 update user locally
  const updateUser = updatedUser => {
    setUser(updatedUser);
  };

  // 🔹 safe refresh
  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user);
    } catch {
      // ignore
    }
  };

  // 🔹 refresh on window focus (guarded)
  useEffect(() => {
    const onFocus = () => {
      if (localStorage.getItem('token')) {
        refreshUser();
      }
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        refreshUser,
        isSuspended,
        isBanned,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
