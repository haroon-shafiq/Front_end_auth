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
    GETUSER: "/api/v1/auth/me",
    GETALLDEVS: "/api/v1/auth/developers",
    CREATEPROJECT: "/api/v2/projects/create",
    GETPROJECT: "/api/v2/projects/",
    DELETEPROJECT: (projectID) => `/api/v2/projects/${projectID}`,
    CREATEBUG: (projectID) => `/api/v3/bugs/${projectID}/create`,
    GETPROJECTS: "/api/v2/projects/getAllProjects",
    ALLBUGS: "/api/v3/bugs/all-bugs",
    GETBUGBYID: (bugID) => `/api/v3/bugs/${bugID}`,
    UPDATEBUGBYID: (bugID) => `/api/v3/bugs/${bugID}`,
    DELETEBUG: (bugID) => `/api/v3/bugs/${bugID}`,
    UPDATESTATUS: (bugID) => `/api/v3/bugs/${bugID}/status`,
    DEVSBYPROJECT: (projectId) => `/api/v1/auth/developers/${projectId}`,
    PROJECTIDBYDEV: "/api/v2/projects/my-projects",
    UPLOAD_IMAGE: (bugID) => `/api/v4/upload/${bugID}`
  },
  SIDEBAR: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
  ]

}