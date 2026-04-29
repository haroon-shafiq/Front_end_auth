'use client'
import { Getuser } from "@/services/auth";
import Sidebar from "../sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const DashboardLayout = ({ children }) => {
console.log("this is dashlayout")
const {setUser} = useContext(AuthContext)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await Getuser();
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);
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