'use client';

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { getProjectsByDeveloper } from "@/services/projects";
import { DeveloperTable } from "@/constants/table";
import { GetBugByID } from "@/services/bugs";
import { Button } from "../ui/button";
import { BugDetailModal } from "../modals/BugDetailModal";

const TaskDetails = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null); 

  useEffect(() => {
    if (!user?.id) return;
    const fetchProjects = async () => {
      try {
        const data = await getProjectsByDeveloper();
        console.log("Fetch projects response", data);
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, [user?.id]);

  const getManagerName = (project) => {
    return project.manager?.name || "Not assigned";
  };

  const getQaBugs = (project) => {
    const bugs = project.bugs || [];
    return bugs.filter((bug) => (
      bug.assignedBy?.role === "QA" ||
      bug.assignedTo?.role === "QA"
    ));
  };

  const HandleView = async (bugID) => {
    console.log("Bug id in task", bugID)
    const res = await GetBugByID(bugID);
    console.log("Fetched bug details", res);
    if (res.success == true) {
      setSelectedBug(res.bug);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl font-semibold">Welcome {user?.name}</h1>
          <p className="text-sm text-gray-500">Developer Dashboard</p>
        </div>

        <div className="mt-10 border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                {DeveloperTable.map((dev) => (
                  <TableHead key={dev.id}>{dev.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => {
                const qaBugs = getQaBugs(project);

                return (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description || "No description available"}</TableCell>
                    <TableCell>{getManagerName(project)}</TableCell>
                    <TableCell>
                      {qaBugs.length > 0
                        ? qaBugs.map((bug) => bug.title).join(", ")
                        : "No QA bugs"}
                    </TableCell>
                    <TableCell>
                      {qaBugs.length > 0
                        ? qaBugs.map((bug) => bug.status).join(", ")
                        : "No QA bugs"}
                    </TableCell>
                    <TableCell>
                      {qaBugs.length > 0
                        ? qaBugs.map((bug) => (
                            new Date(bug.deadline).toLocaleDateString("en-CA")
                          )).join(", ")
                        : "No deadline set"}


                      {qaBugs.map((bug) => (
                        <Button
                          key={bug.id}
                          onClick={() => HandleView(bug.id)}
                          className="ml-2"
                        >
                          View
                        </Button>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>


        <BugDetailModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
        />
      </div>
    </div>
  );
};

export default TaskDetails;