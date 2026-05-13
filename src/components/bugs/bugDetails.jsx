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
import { StatusEditModal } from "../modals/StatusEditModal";
import { Button } from "../ui/button";
import { BugDetailModal } from "../modals/BugDetailModal";
import { UpdateStatus } from "@/services/bugs";
import { DeveloperTable } from "@/constants/table";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { CustomPagination } from "../pagination/Pagination";

export const BugDetails = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [statusBug, setStatusBug] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const router = useRouter()
    const {
        page,
        limit,
        nextPage,
        prevPage,
        changeLimit,
        checkPageLimit
      } = usePaginationQuery(5);
  
  useEffect(() => {
      if(user?.role !== "DEVELOPER"){
        showToast.error("You dont have permission to access this page");
    
        router.push("/dashboard");
      }
    }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const res = await getProjectsByDeveloper(page, limit);
        console.log("data in fecth projects", res.data);
        setProjects(res.data || []);
        checkPageLimit(page, limit, res.totalCount)
        setHasMore(res.hasMore)
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [user?.id], page, limit);
  console.log("Projects==============+>>>>>>>>>>", projects)
  const allBugs = [];

if (Array.isArray(projects)) {
  projects.forEach((project) => {
    const bugs = project?.bugs || [];

    bugs.forEach((bug) => {
      if (bug.assignedTo?.email === user?.email) {
        allBugs.push({ ...bug, project });
      }
    });
  });
}




  const filteredBugs = allBugs.filter((bug) => {
      return statusFilter === "ALL" || bug.status === statusFilter; 

  });
  console.log("Bugš",filteredBugs)

  const handleView = async (bugID) => {
    const res = await GetBugByID(bugID);
    if (res.success) setSelectedBug(res.bug);
  };
  const handleStatus = (bugID) => {
  const bug = allBugs.find((b) => b.id === bugID);
  setStatusBug(bug);
  };
  
  const HandleSave = async (bugID, newStatus) => {
    try {
      const res = await UpdateStatus(bugID, { status: newStatus });
      if (res.success) {
        showToast.success("Status updated successfully");
        const data = await getProjectsByDeveloper();
      
        setProjects(data.data || []);
        setStatusBug(null);
      }
    } catch (error) {
      showToast.error("Failed to update status");
    }
  }


  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-end mt-10 space-x-2">
          <span>Status:</span>
          <select
            className="border px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="NEW">New</option>
            <option value="STARTED">Started</option>
            <option value="RESOLVED">Resolved</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="mt-10 border rounded overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {DeveloperTable.slice(3).map((col) => (
                  <TableHead key={col.id}>{col.label}</TableHead>
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
                      <Button size="sm"
                        onClick={() =>
                          router.push(
                            `/bugs/${bug?.projectId}`,
                          )
                        }
                      >
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleStatus(bug.id)}>
                        Edit Status
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
        <StatusEditModal
          bug={statusBug}
          onClose={() => setStatusBug(null)}
          onSave={HandleSave}
        />
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
    </div>
  );
};
