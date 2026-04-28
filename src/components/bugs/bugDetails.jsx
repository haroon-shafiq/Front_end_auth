'use client';
import { AuthContext } from "@/contexts/AuthContext";
import {  useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { bugTableHead } from "@/constants/table";
import BugFormModal from "../modals/BugForm";
import { createBug, getAllBugs } from "@/services/bugs";


export const BugDetails = () => {

  const {user} = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [bugs, setBugs] = useState([]); 

const fetchData = async () => {
    try {
      const response = await getAllBugs();

      console.log("Fetched bugs", response);
      setBugs(response);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSubmit = async (data) => {
    console.log("Form data to submit", data);
    try {
      const res = await createBug(data);
      console.log("Bug created successfully", res);
      setOpen(false);
      if(res.success == true){
        fetchData();
      }
      onClose();
      

    } catch (err) {
      console.error("Create bug error", err);
    }

  };

useEffect(() => {

  fetchData();

}, []);

  return(
    <div className="w-full">
        <div className="max-w-[1040px] mx-auto">
            <div className="flex justify-between items-center mt-10">
                <h1 className="text-xl font-semibold">Welcome {user?.name}</h1>
                <Button onClick={() => setOpen(true)}>
                    Create Bug
                </Button>
            </div>
            <div className="mt-10 border rounded">
                <Table>
                    <TableHeader>
                        <TableRow> 
                            {user?.role === "QA" && bugTableHead.map((head) => (
                                <TableHead key={head.id}>{head.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bugs.map((bug) => (

                            <TableRow key={bug.id}>
                                <TableCell>{bug.title}</TableCell>
                                <TableCell>{bug.deadline? new Date(bug.deadline).toLocaleDateString() : "N/A"}

                                </TableCell>
                                    
                                <TableCell>{bug.description}</TableCell>
                                <TableCell>{bug.type}</TableCell>
                                <TableCell>{bug.status}</TableCell>
                                <TableCell>{bug.assignedTo?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <BugFormModal 
            isOpen = {open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
           />
            
        </div>
    </div>
  )
};
