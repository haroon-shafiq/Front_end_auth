import { Button } from "../ui/button";
import Image from "next/image";
export const BugDetailModal = ({ bug, onClose, projects }) => {
  if (!bug) return null;
  
  const project = projects?.find((p) =>
    p.bugs?.some((b) => b.id === bug.id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[480px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Bug Details</h2>
        </div>
        {bug.image && (
          <div className="relative w-full mb-2 h-48">
  <Image
    src={bug.image}
    alt="Bug screenshot"
    fill
    className="object-cover rounded"
    priority={false}
  />
</div>
)}
        <div className="space-y-3 text-sm">


          {project && (
            <>
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium text-gray-500">Project</p>
                <p className="text-gray-900">{project.name}</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium text-gray-500">Project Description</p>
                <p className="text-gray-900 max-w-[60%] text-right">{project.description || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-medium text-gray-500">Manager</p>
                <p className="text-gray-900">{project.manager?.name || "N/A"}</p>
              </div>
            </>
          )}


          <div className="flex justify-between border-b pb-2">
            <p className="font-medium text-gray-500">Title</p>
            <p className="text-gray-900">{bug.title}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="font-medium text-gray-500">Description</p>
            <p className="text-gray-900 max-w-[60%] text-right">{bug.description}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="font-medium text-gray-500">Type</p>
            <p className="text-gray-900">{bug.type}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="font-medium text-gray-500">Status</p>
            <p className="text-gray-900">{bug.status}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="font-medium text-gray-500">Deadline</p>
            <p className="text-gray-900">
              {bug.deadline ? new Date(bug.deadline).toLocaleDateString("en-CA") : "No deadline"}
            </p>
          </div>


          {bug.assignedBy && (
            <div className="flex justify-between border-b pb-2">
              <p className="font-medium text-gray-500">Assigned By (QA)</p>
              <p className="text-gray-900">{bug.assignedBy.name} — {bug.assignedBy.email}</p>
            </div>
          )}
          {bug.assignedTo && (
            <div className="flex justify-between border-b pb-2">
              <p className="font-medium text-gray-500">Assigned To</p>
              <p className="text-gray-900">{bug.assignedTo.name} — {bug.assignedTo.email}</p>
            </div>
          )}

        </div>

        <div className="mt-6">
          <Button className="w-full" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};