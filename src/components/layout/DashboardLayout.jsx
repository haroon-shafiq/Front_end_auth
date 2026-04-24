'use client'

import { useEffect, useContext } from "react";
import { Getuser } from "@/services/auth";
import { AuthContext } from "@/contexts/AuthContext";
import Sidebar from "../sidebar";

const DashboardLayout = ({ children }) => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Getuser();

        console.log("Full response:", res.data);

        setUser(res.data);

      } catch (error) {
        console.error("Error fetching user", error);
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