import { NextResponse } from "next/server";
import { ROUTES } from "./constants/routes.js";

const authRoutes = ["/", "/signup", "/signin"];
const protectedPrefixes = ["/dashboard", "/projects", "/tasks/assign", "/bugs"];

export function proxy(req) {
  const token = req.cookies.get("token");
  const path = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(path);
  const isProtectedRoute = protectedPrefixes.some((prefix) => path.startsWith(prefix));

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.ui.AUTH.LOGIN, req.url));
  }

  return NextResponse.next();
}