import React, { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onAuthStateChange } from "../api/firebase";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChange((user) => {
      // console.log(user);
      setUser(user);
    });
  }, [user]);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
