import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

const GoogleSignInButton: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            loginWithGoogle(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
        theme="outline"
        shape="rectangular"
        text="signin_with"
        width="100%"
      />
    </div>
  );
};

export default GoogleSignInButton;