import React, { createContext, useState, useContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleUser, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const loginWithGoogle = (credential: string) => {
    try {
      const decodedUser = jwtDecode<GoogleUser>(credential);
      setUser(decodedUser);
      setIsAuthenticated(true);
      
      // In a real app, you would store the token in localStorage or a secure cookie
      localStorage.setItem('googleToken', credential);
      
      console.log('Google user logged in:', decodedUser);
    } catch (error) {
      console.error('Error decoding Google token:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('googleToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};