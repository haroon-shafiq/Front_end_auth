'use client'
import React from "react";

export const StatCard = ({ title, value }) => {
  return (
    <div className="border p-4 rounded-2xl w-full">
      <div className="flex flex-col gap-2">
        <h1>{title}</h1>
        <p>{value}</p>
      </div>
    </div>
  );
};
