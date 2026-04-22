import Sidebar from "@/components/sidebar";

export const metadata = {
    title: "Dashboard",
    description: "This is dashboard",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>

    );
}
