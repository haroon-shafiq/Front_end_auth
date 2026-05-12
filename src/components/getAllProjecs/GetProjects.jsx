"use client";

import { useEffect, useState, useContext } from "react";

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
import { CustomPagination } from "../pagination/Pagination";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { CircleLoader } from "react-spinners";
import { useRouter } from "next/navigation";


export default function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const {
  page,
  limit,
  nextPage,
  prevPage,
  changeLimit,
  checkPageLimit,
} = usePaginationQuery(5);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getALLProjects(page, limit);
        
        console.log("Response in projects fetch", res);
        checkPageLimit(page,limit, res.totalProjects);
        setProjects(res.data || []);
        setHasMore(res.hasMore);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      finally{
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, [page, limit]);

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="max-w-[1040px] mx-auto mt-10">


        <Table>
          <TableHeader>
            <TableRow>
              {user?.role === "MANAGER" &&
                ManagerInfoTable.map((head) => (
                  <TableHead key={head.id}>
                    {head.label}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project?.name}</TableCell>

                <TableCell>
                  {project?.manager?.name}
                </TableCell>

                <TableCell>
                  {project?.description}
                </TableCell>

                <TableCell>
                  {project?.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        <div className="mt-6 flex justify-end">
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
    </section>
  );
}