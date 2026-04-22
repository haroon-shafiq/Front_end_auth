export const ROUTES = {
  ui: {
    HOME: "/",
    AUTH: {
      LOGIN: "/signin",
      REGISTER: "/signup",
      DASHBOARD: "/dashboard",
      HOME: "/"
    },
    DASHBOARD: "/dashboard"
  },
  API_ROUTES: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    LOGOUT: "/users/logout"
  },
  SIDEBAR: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ]

}