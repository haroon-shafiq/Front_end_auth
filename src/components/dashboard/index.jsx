"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ManagerDashboard from "./ManagerDashboard";
import DeveloperDashbaord from "./DeveloperDashbaord";
import QADashboard from "./QADashboard";


export default function DashboardDetails() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  const roleMap = {
    MANAGER: <ManagerDashboard />,
    DEVELOPER: <DeveloperDashbaord />,
    QA: <QADashboard />,
  };

  return roleMap[user?.role] || <p>Unauthorized role</p>;
}
