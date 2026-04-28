"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTES } from "../constants/routes.js";
import { useRouter } from "next/navigation";
import { Logout } from "@/services/auth.js";
import { showToast } from "@/lib/toast.js";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { sidebarConfig } from "@/constants/sidebarConfig.js";


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useContext(AuthContext);
  console.log("User", user)
    
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const sidebarData = sidebarConfig[user?.role] || [];
  console.log("Sidebar dara", sidebarData);

  const handleLogout = async () => {
    const result = await Logout();
    showToast.success(result.message);
    router.push(ROUTES.ui.AUTH.LOGIN);
  };

  return (
    <aside
      className={`bg-sidebar-background text-sidebar-text h-screen p-5 transition-all duration-300 ${
        open ? "w-60" : "w-20"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="mb-6 text-xs bg-sidebar-text/10 px-2 py-1 rounded hover:bg-sidebar-text/20 "
      >
        {open ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      <nav className="space-y-3 h-[90%] ">
        <div className="flex flex-col  gap-3 justify-between h-full ">
          <div className="flex flex-col  gap-3 ">
            {sidebarData.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block p-2 rounded-md transition-colors ${
                  pathname === link.path
                    ? "bg-sidebar-text/10"
                    : "hover:bg-sidebar-text/5"
                }`}
              >
                {open ? link.label : link.label.charAt(0)}
              </Link>
            ))}
          </div>

            <button onClick={handleLogout} className="hover:bg-sidebar-text/10 flex justify-start p-2 rounded-md  cursor-pointer ">
              Logout
            </button>

        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
