"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBugByID } from "@/services/bugs";
import { CircleLoader } from "react-spinners";
import {BUGSDETAIL_TABLE_HEADER} from "@/constants/table.js";

const page = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBug = async () => {
      try {
        const res = await GetBugByID(id);
        if (res.success) {
          setBug(res.bug);
        }
      } catch (err) {
        console.error("Failed to fetch bug", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBug();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircleLoader />
      </div>
    );
  }

  if (!bug) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-500">No bug found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-500 hover:text-black flex items-center gap-1"
      >
        Back to Bugs
      </button>

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
                  {BUGSDETAIL_TABLE_HEADER.map((table) => (
                    <tr key={table.id} className="border-b">
                      <td  className="p-4 font-medium w-[40%]">{table.label}</td>
                      <td className="p-4">
                        {table.format
                          ? table.format(bug?.[table.key])
                          : bug?.[table.key]}
                      </td>
                    </tr>
                  ))}
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