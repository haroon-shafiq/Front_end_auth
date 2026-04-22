import { NextResponse } from "next/server";
import { ROUTES } from "./constants/routes.js";

const authRoutes = [
    "/", "/signup", "/signin"
];

export function proxy(req) {

    const token = req.cookies.get("token");
    console.log("Token", token?.value);
    const path = req.nextUrl.pathname;
    console.log("Path", path);

    const isAuthRoute = authRoutes.includes(path);
    const isProtectedRoute = path.startsWith("/dashboard");

    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL(ROUTES.ui.AUTH.LOGIN, req.url));
    }

    return NextResponse.next();
}