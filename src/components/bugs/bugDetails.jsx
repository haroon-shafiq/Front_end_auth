'use client';
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { bugTableHead } from "@/constants/table";
import BugFormModal from "../modals/BugForm";
import { createBug, getAllBugs } from "@/services/bugs";
import { GetBugByID } from "@/services/bugs";
import { BugDetailModal } from "../modals/BugDetailModal";
import { CircleLoader } from "react-spinners";
import { updateBug } from "@/services/bugs";


export const BugDetails = () => {

  const {user} = useContext(AuthContext);
  const [open, setOpen] = useState(false);


  const [bugs, setBugs] = useState([]); 
  const [selectedBug, setSelectedBug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBug, setEditBug] = useState(null);            // for Edit modal — ADD THIS

  // const [selectBugUpdate, setSelectBugUpdate] = useState(null);

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
      setLoading(true);

      const res = await createBug(data);
      console.log("Bug created successfully", res);
      setOpen(false);

      if (res.success == true) {
        fetchData();
      }
    } catch (err) {
      console.error("Create bug error", err);
    }
    finally{
      setLoading(false)
    }

  };

const handleUpdate = async (data) => {
    console.log("Data being sent:", data); // ← add this

    console.log("editBug:", editBug);       
  console.log("editBug.id:", editBug?.id); 
  try {
    setLoading(true);
    const res = await updateBug(editBug.id, data);
    if (res.success) {
      fetchData();
      setOpen(false);
      setEdit(false);
        setEditBug(null);   
    }
  } catch (err) {
    console.error("Update bug error", err);
  } finally {
    setLoading(false);
  }
};


  const HandleView = async (bugID) => {
    const res = await GetBugByID(bugID);
    console.log("Fetched bug details", res);
    if (res.success == true) {
      setSelectedBug(res.bug); 
    }


  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircleLoader />
    </div>
  );
}

  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl font-semibold">Welcome {user?.name}</h1>
          <div className="space-x-3">
            <Button
              onClick={() => {
                setOpen(true);
                setEdit(false);
              }}
            >
              Create Bug
            </Button>

          </div>
        </div>
        <div className="mt-10 border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                {user?.role === "QA" &&
                  bugTableHead.map((head) => (
                    <TableHead key={head.id}>{head.label}</TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bugs?.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell>{bug.title}</TableCell>
                  <TableCell>
                    {bug.deadline
                      ? new Date(bug.deadline).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  <TableCell>{bug.type}</TableCell>
                  <TableCell>{bug.status}</TableCell>
                  <TableCell>{bug.assignedTo?.name}</TableCell>
                  <TableCell>
                    <div className="space-x-3">
                    <Button onClick={() =>{ 
                      HandleView(bug.id); 
                      setEdit(false)}}>View</Button>
                    <Button onClick={() => {
  setEdit(true);
  setOpen(true);         
  setEditBug(bug);  
}}>Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <BugFormModal
  isOpen={open}
  onClose={() => { setOpen(false); setEdit(false); setSelectedBug(null); }}
  onSubmit={edit ? handleUpdate : handleSubmit}
  isEdit={edit}
  bugData={editBug}     

/>
        <BugDetailModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
        />
      </div>
    </div>
  );
};