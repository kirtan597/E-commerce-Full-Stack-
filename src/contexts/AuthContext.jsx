import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockAuth } from '../utils/mockAuth';

const AuthContext = createContext({
  user: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setIsAdmin(currentUser?.email === 'admin@shophub.com');
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};