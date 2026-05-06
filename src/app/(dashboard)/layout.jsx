import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = {
    title: "Dashboard",
    description: "This is dashboard",
};

export default async function Layout({ children }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout> 
    );
}
