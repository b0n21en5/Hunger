import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const prevUser = JSON.parse(localStorage.getItem("user-hunger"));
    if (prevUser) {
      setUser(prevUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user-hunger", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
