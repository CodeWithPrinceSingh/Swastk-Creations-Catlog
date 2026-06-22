import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, signupRequest, fetchMe } from '../api/auth.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'bride_store_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { user, token } = await loginRequest({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const { user, token } = await signupRequest({ name, email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
