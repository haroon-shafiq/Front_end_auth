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
import { DeveloperTable } from "@/constants/table";
import { getProject } from "@/services/projects";
import { getProjectsByDeveloper } from "@/services/projects";
import { deleteProject } from "@/services/projects";
import AddProjectModal from "../modals/ProjectForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { CustomPagination } from "../pagination/Pagination";

const ProjectDetail = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsDev, setProjectsDev] = useState([]);
  const [activeProject, setactiveProject] = useState(false);
  const router = useRouter()
  const isManager = user?.role === "MANAGER";
  const isDeveloper = user?.role === "DEVELOPER";
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
      page,
      limit,
      nextPage,
      prevPage,
      changeLimit,
      checkPageLimit
    } = usePaginationQuery(5);

  useEffect(() => {
    if(user && user?.role !== "MANAGER" && user?.role !== "DEVELOPER"){
      console.log("User role is============>>>>>>>>>>>", user?.role)
      showToast.error("You dont have permission to access this page");
      router.push("/dashboard");
    }
  }, []);
  const fetchProjects = async () => {
  try {
    if (isManager) {
      const res = await getProject(page,limit);
        setProjects(res.data || []);
        checkPageLimit(page, limit, res.totalCount)
        setHasMore(res.hasMore)
    }

    if (isDeveloper) {
      const res = await getProjectsByDeveloper(page,limit);
      setProjectsDev(res.data || []);
      checkPageLimit(page, limit, res.totalCount)
      setHasMore(res.hasMore)
    }
  } catch (error) {
    console.error("Error fetching projects", error);
  }
};
useEffect(() => {
  if (user) {
    fetchProjects();
  }
}, [user, open, page, limit]);
const DeleteProject = async (projectId) => {
  const previousProjects = projects;

  setProjects((prev) =>
    prev.filter((project) => project.id !== projectId)
  );

  try {
    const res = await deleteProject(projectId);

    if (res.success) {
      showToast.success("Project deleted successfully");
    } else {
      setProjects(previousProjects);
      showToast.error("Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project", error);
    setProjects(previousProjects);
  }
};
  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-end items-center mt-10">
          {isManager && (
            <Button onClick={() => setOpen(true)}>Add Project</Button>
          )}
        </div>

        <div className="mt-10 border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                {isManager &&
                  managerTableHead.map((head) => (
                    <TableHead key={head.id}>{head.label}</TableHead>
                  ))}
                {isDeveloper &&
                  DeveloperTable.slice(0, 3).map((head) => (
                    <TableHead key={head.id}>{head.label}</TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isManager &&
                projects.map((project) => (
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
                       <TableCell>
                      {project.projectUsers[0].acceptInvite == true ? "Accepted" : "Pending"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => router.push(`/bugs/${project.id}`)}
                      >
                        View Bugs
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => DeleteProject(project.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {isDeveloper &&
                projectsDev.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>
                      {project.description || "No description available"}
                    </TableCell>
                    <TableCell>{project.manager.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddProjectModal isOpen={open} onClose={() => setOpen(false)} />


        <div className="mt-10 flex justify-end mr-15">
          <CustomPagination
            page={page}
            limit={limit}
            hasMore={hasMore}
            onNext={nextPage}
            onPrevious={prevPage}
            onLimitChange={changeLimit}
          />
        </div>

    </div>
  );
};

export default ProjectDetail;
