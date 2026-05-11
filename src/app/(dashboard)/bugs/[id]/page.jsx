"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GetBugByID, GetBugByProjectID } from "@/services/bugs";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "@/contexts/AuthContext";

const page = () => {
  const params = useParams();
  const id = params.id;
  const { user } = useContext(AuthContext);
  const checkRole = user?.role;

  const [bugs, setBugs] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkRole || !id) return;

    if (checkRole === "MANAGER" || checkRole === "DEVELOPER") {
      getBugByProjectId(id);
    } else if (checkRole === "QA") {
      fetchBugById(id); 
    }
  }, [checkRole, id]);


  const getBugByProjectId = async (projectId) => {
    try {
      const res = await GetBugByProjectID(projectId);
      setBugs(res?.bugs || res || []);
      setProjectInfo(res?.project || null);
    } catch (err) {
      console.error("Failed to fetch bugs by project", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchBugById = async (bugId) => {
    try {
      const res = await GetBugByID(bugId);
      if (res.success) {
        setBugs([res.bug]);
      }
    } catch (err) {
      console.error("Failed to fetch bug by ID", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader />
      </div>
    );
  }

  if (!bugs || bugs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-500">No bugs found.</p>
      </div>
    );
  }

  const bug = bugs[0];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border">
        <div className="border-b px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">{bug?.title}</h1>
          <p className="text-gray-500 mt-2">{bug?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Bug Image</h2>
            {bug?.image ? (
              <img
                src={bug.image}
                alt={bug.title}
                className="w-full h-[350px] object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-[350px] border rounded-xl flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Bug Details</h2>
            <div className="overflow-hidden border rounded-xl">
              <table className="w-full">
                <tbody>
                  {(checkRole === "MANAGER" || checkRole === "DEVELOPER") && projectInfo && (
                    <>
                      <tr className="border-b">
                        <td className="p-4 font-medium w-[40%]">Project Title</td>
                        <td className="p-4">{projectInfo?.name}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium w-[40%]">Project Description</td>
                        <td className="p-4">{projectInfo?.description}</td>
                      </tr>
                    </>
                  )}

                  <tr className="border-b">
                    <td className="p-4 font-medium w-[40%]">Bug Title</td>
                    <td className="p-4">{bug?.title}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium w-[40%]">Description</td>
                    <td className="p-4">{bug?.description}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium w-[40%]">Status</td>
                    <td className="p-4">{bug?.status}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium w-[40%]">Type</td>
                    <td className="p-4">{bug?.type}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium w-[40%]">Deadline</td>
                    <td className="p-4">
                      {bug?.deadline
                        ? new Date(bug.deadline).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;