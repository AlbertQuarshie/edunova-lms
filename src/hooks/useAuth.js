import { createContext, useContext } from "react";

// This is the "channel" where auth data will travel
export const AuthContext = createContext();

// This is the "plug" components use to listen to that channel
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};