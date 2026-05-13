"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useContext } from "react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { bugTableHead } from "@/constants/table";
import BugFormModal from "../modals/BugForm";
import { createBug, getAllBugs } from "@/services/bugs";
import { DeleteBug } from "@/services/bugs";
import { CircleLoader } from "react-spinners";
import { updateBug } from "@/services/bugs";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { CustomPagination } from "../pagination/Pagination";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";

export const Bugs = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBug, setEditBug] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const {page, limit, nextPage, prevPage, changeLimit, checkPageLimit} = usePaginationQuery(5);
  // const [selectBugUpdate, setSelectBugUpdate] = useState(null);
  useEffect(() => {
    if (user?.role !== "QA") {
      console.log("User role is============>>>>>>>>>>>", user?.role);
      showToast.error("You dont have permission to access this page");

      router.push("/dashboard");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllBugs(page, limit);
      console.log("Fetched bugs", response);
      setBugs(response.data);
      checkPageLimit(page, limit, response.totalCount)
      setHasMore(response.hasMore)
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
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    console.log("Data being sent:", data);

    console.log("editBug:", editBug);
    console.log("editBug.id:", editBug?.id);
    try {
      setLoading(true);
      const res = await updateBug(editBug.id, data);
      if (res.success) {
        fetchData();
        setOpen(false);
        setEdit(false);
        setEditBug(res);
      }
    } catch (err) {
      console.error("Update bug error", err);
    } finally {
      setLoading(false);
    }
  };
  const HandleDeleteBug = async (bugID) => {
    const previousBugs = bugs;

    setBugs((prev) => prev.filter((bug) => bug.id !== bugID));

    try {
      const res = await DeleteBug(bugID);

      if (res.success) {
        showToast.success("Bug deleted successfully");
      } else {
        setBugs(previousBugs);

        showToast.error("Failed to delete bug");
      }
    } catch (error) {
      console.error("Bug delete error", error);

      setBugs(previousBugs);

      showToast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleLoader />
      </div>
    );
  }
  console.log("++++++++++++++++,,,", bugs);

  return (
    <div className="w-full">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex justify-end items-center mt-10">
          <Button
            onClick={() => {
              setOpen(true);
              setEdit(false);
            }}
          >
            Create Bug
          </Button>
        </div>
        <div className="mt-10 border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                {user?.role === "QA" &&
                  bugTableHead.map((head) => (
                    <TableHead key={head.id}>{head.label} </TableHead>
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
                      <Button onClick={() => router.push(`/bugs/${bug.id}`)}>
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          setEdit(true);
                          setOpen(true);
                          setEditBug(bug);
                        }}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => HandleDeleteBug(bug.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <BugFormModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setEdit(false);
            setSelectedBug(null);
          }}
          onSubmit={edit ? handleUpdate : handleSubmit}
          isEdit={edit}
          bugData={editBug}
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
