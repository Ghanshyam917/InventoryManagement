export interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    sub: string; // Google's user ID
  }
  
  export interface AuthContextType {
    isAuthenticated: boolean;
    user: GoogleUser | null;
    login: () => void;
    loginWithGoogle: (credential: string) => void;
    logout: () => void;
  }