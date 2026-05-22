'use client'
import Sidebar from "../sidebar";
import Header from "../header/header";
const DashboardLayout = ({ children }) => {
console.log("this is dashlayout")


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header/>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;