import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './User/Login';
import Signup from './User/Signup';
// import Dashboard from './Pages/Dashboard';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import BeforeLogin from './Pages/BeforeLogin';
import InventoryPage from './Pages/InventoryPage';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/inventory" /> : element;
};

function AppRoutes() {
  const { login, loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
      <Route 
          path="/" 
          element={<BeforeLogin/>} 
        />
        <Route 
          path="/login" 
          element={<PublicRoute element={<Login onLogin={login} onGoogleLogin={loginWithGoogle} />} />} 
        />
        <Route 
          path="/signup" 
          element={<PublicRoute element={<Signup onSignup={login} />} />} 
        />
        <Route 
          path="/forgot-password" 
          element={<ForgotPassword />} 
        />
        <Route 
          path="/reset-password" 
          element={<ResetPassword />} 
        />
        {/* <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        /> */}
        <Route 
          path="/inventory" 
          element={<ProtectedRoute element={<InventoryPage />} />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;