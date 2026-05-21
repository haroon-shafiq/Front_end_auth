import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/config/env";
import { loginUser } from "@/services/auth";
import { ROUTES } from "../constants/routes.js"

const ACCESS_TOKEN_TTL_MS = 1 * 60 * 1000;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await loginUser({
            email: credentials?.email,
            password: credentials?.password,
          });
          if (data?.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              accessToken: data.token,
            };
          }
          return null;
        } catch (error) {
          throw new Error(error?.response?.data?.message || "Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
          expiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
        };
      }

      if (Date.now() < token.expiresAt) {
        return token;
      }

      try {
        const res = await fetch(
          `${env.apiUrl}${ROUTES.API_ROUTES.REFRESHTOKEN}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: token.id }),
          },
        );

        if (!res.ok) throw new Error("Refresh failed");

        const data = await res.json();
        console.log("JSON=======>>>>>>", data)
        const newAccessToken = data.newAccessToken;

        return {
          ...token,
          accessToken: newAccessToken,
          expiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
          error: undefined,
        };
      } catch {
        return { ...token, error: "RefreshTokenExpired" };
      }
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: env.NEXTAUTH_SECRET,
};
