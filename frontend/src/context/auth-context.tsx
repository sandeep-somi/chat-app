import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for context value
type AuthContextType = {
  auth_user: any; // Replace 'any' with the actual type of auth_user if possible
  setAuthUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of auth_user if possible
};

// Create the AuthContext with initial empty object
export const AuthContext = createContext<AuthContextType>({
  auth_user: null,
  setAuthUser: () => { }
});

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Props type for AuthContextProvider component
type AuthContextProviderProps = {
  children: ReactNode; // ReactNode includes any valid React child: JSX, strings, fragments, etc.
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [auth_user, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem('chat-user')) || null);

  return (
    <AuthContext.Provider value={{ auth_user, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};