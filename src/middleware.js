import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ROUTES } from "@/constants/routes";

const authRoutes = ["/signin", "/signup", "/"];
const protectedPrefixes = ["/dashboard", "/projects", "/tasks", "/bugs"];

export default async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(path);
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.ui.AUTH.LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};