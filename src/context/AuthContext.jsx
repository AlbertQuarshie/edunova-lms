import { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../hooks/useAuth"; // Import the context object from the hooks file

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Manages the logged-in user state [cite: 81]
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};