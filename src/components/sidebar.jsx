"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTES } from "../constants/routes.js";
import { useRouter } from "next/navigation";
import { Logout } from "@/services/auth.js";
import { showToast } from "@/lib/toast.js";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const result = await Logout();
        showToast.success(result.message);
        router.push(ROUTES.ui.AUTH.LOGIN);
    };

    return (
        <aside
            className={`bg-sidebar-background text-sidebar-text h-screen p-5 transition-all duration-300 ${open ? "w-60" : "w-20"
                }`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 text-xs bg-sidebar-text/10 px-2 py-1 rounded hover:bg-sidebar-text/20 "
            >
                {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>


            <nav className="space-y-3 h-[90%] ">
                <div className="flex flex-col  gap-3 justify-between h-full ">
                    <div className="flex flex-col  gap-3 ">
                        {ROUTES.SIDEBAR.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block p-2 rounded-md transition-colors ${pathname === link.href
                                    ? "bg-sidebar-text/10"
                                    : "hover:bg-sidebar-text/5"
                                    }`}
                            >
                                {open ? link.label : link.label.charAt(0)}
                            </Link>


                        ))}
                    </div>
                    <div >
                        <button onClick={handleLogout} className="cursor-pointer"> Logout</button>
                    </div>
                </div>

            </nav>
        </aside>
    );
};

export default Sidebar;