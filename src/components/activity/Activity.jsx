'use client'

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { getNotification } from "../../services/notifications.js";
import Notifications from "./Notifications";

export const Activity = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.role === "DEVELOPER") {
      router.push("/dashboard");
    }
  }, [user, router]);

  const fetchNotifications = async () => {
    try {
      const result = await getNotification();
      setNotifications(result.notifications);
      
    } catch (error) {
      console.log("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    if (user?.role) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-[80px]">
        <div className="mt-10 flex justify-between">
          <h1 className="text-2xl font-bold">
            Activity Page
          </h1>
          <p>{user?.name}</p>
        </div>

        <div className="mt-10 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((project) => (
              <div
                key={project.id}
                className="p-1"
              >
                <Notifications project={project} />
              </div>
            ))
          ) : (
            <p>No notifications found</p>
          )}

        </div>

      </div>

    </section>
  );
};