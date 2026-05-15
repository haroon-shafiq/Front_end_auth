"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GetBugByID, GetBugByProjectID } from "@/services/bugs";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "@/contexts/AuthContext";
import {MANAGERTABLEFORBUGS} from "@/constants/table.js"

const page = () => {
  const params = useParams();
  const id = params.id;
  const { user } = useContext(AuthContext);
  const checkRole = user?.role;
  const router = useRouter();

  const [bugs, setBugs] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkRole || !id) return;

    if (checkRole === "MANAGER") {
      getBugByProjectId(id);
    } else if (checkRole === "DEVELOPER" || checkRole === "QA") {
      fetchBugById(id);
    }
  }, [checkRole, id]);

  const getBugByProjectId = async (projectId) => {
    try {
      const res = await GetBugByProjectID(projectId);
      setBugs(res?.bugs || []);
      setProjectInfo({ name: res?.name, description: res?.description });
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


  if (checkRole === "MANAGER") {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">

        <div className="overflow-hidden border">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-700">All Bugs for the project {projectInfo?.name}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {MANAGERTABLEFORBUGS.map((table) => (
                    <th key={table.id} className="p-4 text-left font-medium text-gray-600">{table.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bugs.map((bug) => (
                  <tr key={bug.id} className="border-t ">
                    <td className="p-4">{bug.title}</td>
                    <td className="p-4">{bug.description}</td>
                    <td className="p-4">
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
                    </td>
                    <td className="p-4">{bug.type}</td>
                    <td className="p-4">
                      {bug.deadline
                        ? new Date(bug.deadline).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => router.push(`/bugs/detail/${bug.id}`)}
                        className="bg-black text-white px-3 py-1 rounded text-sm "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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