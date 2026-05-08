"use client";
import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center mt-10 mx-[80px]">
      <h1 className="text-xl font-semibold">Welcome {user?.name} </h1>
      <div className="flex flex-col mt-1">
      <p className="text-md">{user?.name} Dashboard</p>
      <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>
  );
};

export default Header;
