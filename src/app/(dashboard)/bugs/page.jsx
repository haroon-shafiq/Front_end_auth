'use client'
import { Bugs } from "@/components/bugs/Bugs";
import { BugDetails } from "@/components/bugs/BugDetails";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
const page = () => {
    const {user} = useContext(AuthContext);
  
  if(!user) return <p>Loading...</p>

  const checkRole = {
    DEVELOPER: <BugDetails/>,
    QA: <Bugs/> 
  }
  return checkRole[user?.role];
}

export default page


