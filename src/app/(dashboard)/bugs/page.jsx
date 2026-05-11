'use client'
import { Bugs } from "@/components/bugs/Bugs";
import { BugDetails } from "@/components/bugs/BugDetails";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
const page = () => {
    const {user} = useContext(AuthContext);
    console.log("User role============", user)
    const router = useRouter();
  
  if(!user) return <p>Loading...</p>
  // if(user?.role == "MANAGER"){
  //   router.push('/dashboard');
  // }

  const checkRole = {
    DEVELOPER: <BugDetails/>,
    QA: <Bugs/> 
  }
  return checkRole[user?.role];
}

export default page


