'use client'
import { Suspense } from "react";
import { Bugs } from "@/components/bugs/Bugs";
import { BugDetails } from "@/components/bugs/BugDetails";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { CircleLoader } from "react-spinners";

const page = () => {
  const { user } = useContext(AuthContext);

  if (!user) return (
    <div className="flex justify-center items-center h-screen">
      <CircleLoader />
    </div>
  );

  const checkRole = {
    DEVELOPER: <Suspense fallback={<div className="flex justify-center items-center h-screen"><CircleLoader /></div>}><BugDetails /></Suspense>,
    QA: <Suspense fallback={<div className="flex justify-center items-center h-screen"><CircleLoader /></div>}><Bugs /></Suspense>,
  };

  return checkRole[user?.role] || null;
};

export default page;