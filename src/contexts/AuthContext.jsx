
"use client";
import { createContext } from "react";
import { useSession } from "next-auth/react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  console.log("Session", session)
  const value = {
    user: session?.user ?? null,
    accessToken: session?.accessToken ?? null,
    loading: status === "loading",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};