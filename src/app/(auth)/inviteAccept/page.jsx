"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { acceptInvite } from "@/services/projects";
import { CircleLoader } from "react-spinners";

export default function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");


const accept = async () => {
      try {
        const res = await acceptInvite(token);
        console.log("Response===========>>>>>>>>.",res);
        setStatus("success");
        setMessage(res.message);
      } catch (error) {
        setStatus("error");
        setMessage(error.message)
      }
    };


  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid invitation link.");
      return;
    }
    accept();
  }, [token]);

  if(status === "loading"){
    <CircleLoader/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-sm w-full">

        {status === "loading" && (
            <p className="text-gray-500">Verifying invitation...</p>
        )}

        {status === "success" && (
          <>
            <h2 className="font-semibold text-gray-800 mb-1">You're Verified!</h2>
            <p className="text-gray-500 text-xl">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="font-semibold text-gray-800 mb-1">{message}</h2>
            <p className="text-gray-500 text-sm">{message}</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-5 px-5 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              Go to Dashboard
            </button>
          </>
        )}

      </div>
    </div>
  );
}