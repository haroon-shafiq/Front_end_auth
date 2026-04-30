'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "../ui/table";
import { getProjectsByDeveloper } from "@/services/projects";
import { GetBugByID } from "@/services/bugs";
import { Button } from "../ui/button";
import { BugDetailModal } from "../modals/BugDetailModal";
import { DeveloperTable } from "@/constants/table";

const TaskDetails = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const data = await getProjectsByDeveloper();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [user?.id]);

  const allBugs = [];

  projects.forEach(project => {
  const bugs = project.bugs || [];

  bugs.forEach(bug => {
     if (bug.assignedBy?.role === "QA") {
      allBugs.push(bug);
    }
  });
});

  const filteredBugs = allBugs.filter((bug) => {
    if(statusFilter === "ALL" || bug.status === statusFilter){
      return statusFilter
    };
  });

  const handleView = async (bugID) => {
    const res = await GetBugByID(bugID);
    if (res.success) setSelectedBug(res.bug);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">

      
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl font-semibold">
            Welcome {user?.name}
          </h1>
          <p className="text-sm text-gray-500">
            Developer Dashboard
          </p>
        </div>

    
        <div className="flex justify-end mt-10 space-x-2">
          <span>Status:</span>
          <select
            className="border px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="NEW">New</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

      
        <div className="mt-10 border rounded overflow-hidden">
          <Table>

            <TableHeader>
              <TableRow>
                {DeveloperTable.slice(3).map((col) => (
                  <TableHead key={col.id}>
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredBugs.length > 0 ? (
                filteredBugs.map((bug) => (
                  <TableRow key={bug.id}>

                    <TableCell>{bug.title}</TableCell>

                    <TableCell>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          bug.status === "NEW"
                            ? "bg-green-100 text-green-700"
                            : bug.status === "RESOLVED"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bug.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      {bug.deadline
                        ? new Date(bug.deadline).toLocaleDateString("en-CA")
                        : "No deadline"}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleView(bug.id)}
                      >
                        View
                      </Button>
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-5">
                    No bugs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </div>

  
        <BugDetailModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
          projects={projects}
        />

      </div>
    </div>
  );
};

export default TaskDetails;