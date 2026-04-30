"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { managerTableHead } from "@/constants/table";
import { getProject } from "@/services/projects";
import AddProjectModal from "../modals/ProjectForm";
import { Button } from "../ui/button";

const ProjectDetail = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await getProject();
        console.log("Fetched projects", projectsRes);
        console.log("Fetched projects", projectsRes);
        setProjects(projectsRes);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  },[open]);

  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl font-semibold">Welcome {user?.name}</h1>
          {user?.role === "MANAGER" && (
            <Button onClick={() => setOpen(true)}>
              Add Project
            </Button>
          )}
        </div>

        <div className="mt-10 border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                {user?.role === "MANAGER" && managerTableHead.map((head) => (
                  <TableHead key={head.id}>{head.label}</TableHead>
                ))}
      
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    {project.description || "No description available"}
                  </TableCell>
                  <TableCell>
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString("en-CA")
                      : "No deadline set"}
                  </TableCell>

                  <TableCell>
                    {project.projectUsers?.length > 0
                      ? project.projectUsers
                          .map((pu) => pu.user.name)
                          .join(", ")
                      : "Unassigned"}
                  </TableCell>
                                    <TableCell>
                    {project.projectUsers?.length > 0
                      ? project.projectUsers
                          .map((pu) => pu.user.email)
                          .join(", ")
                      : "Unassigned"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default ProjectDetail;
