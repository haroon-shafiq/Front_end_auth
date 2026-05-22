import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/config/env";
import { loginUser, RefreshToken } from "@/services/auth";
import { AUTH_ERRORS } from "@/constants/enums";

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
          throw new Error(error?.response?.data?.message || AUTH_ERRORS.LOGIN_FAIL);
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

  console.log("JWT CHECK ── expiresAt:", new Date(token.expiresAt).toISOString())
  console.log("JWT CHECK ── now:", new Date().toISOString())
  console.log("JWT CHECK ── expired?", Date.now() >= token.expiresAt)
  console.log("JWT CHECK ── current accessToken:", token.accessToken)

      if (Date.now() < token.expiresAt) {
        return token;
      }

      try {
        const newAccessToken = await RefreshToken(token);
        return {
          ...token,
          accessToken: newAccessToken,
          expiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
          error: undefined,
        };
      } catch {
        return { ...token, error: AUTH_ERRORS.Refresh_Token_Expired };
      }
    },

    async session({ session, token }) {
      console.log("SESSION ── error:", token.error)
      console.log("SESSION ── accessToken:", token.accessToken)
      console.log("Token in session", token)
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
