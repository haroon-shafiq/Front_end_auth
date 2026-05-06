
"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Provider } from "./provider";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <Provider>
          {children}
        </Provider>
      </AuthProvider>
    </SessionProvider>
  );
}