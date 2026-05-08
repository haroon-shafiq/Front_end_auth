"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { getALLProjects } from "@/services/projects";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { ManagerInfoTable } from "@/constants/table";

export default function GetProjects() {
  const [projects, setProjects] = useState([]);

  const {user} = useContext(AuthContext);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getALLProjects();

        console.log("Projects", data);

        setProjects(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full">
      <div className="max-w-[1040px] mx-auto mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              {user?.role === "MANAGER" &&
                ManagerInfoTable.map((head) => (
                  <TableHead key={head.id}>{head.label}</TableHead>
                ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project?.name}</TableCell>
                <TableCell>{project?.manager?.name}</TableCell>
                <TableCell>{project?.description}</TableCell>

                <TableCell>
                  {project?.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
