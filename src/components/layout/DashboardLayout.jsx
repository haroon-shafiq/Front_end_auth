'use client'
import Sidebar from "../sidebar";

const DashboardLayout = ({ children }) => {
console.log("this is dashlayout")
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;