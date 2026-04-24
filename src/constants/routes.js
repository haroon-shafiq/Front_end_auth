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
    REGISTER: "/api/v1/auth/register",  
    LOGIN: "/api/v1/auth/login", 
    LOGOUT: "/api/v1/auth/logout", 
    GETUSER: "/api/v1/auth/me"
  },
  SIDEBAR: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ]

}