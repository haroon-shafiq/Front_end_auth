import { Button } from "../ui/button";

export const BugDetailModal = ({ bug, onClose }) => {
  if (!bug) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[480px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Bug Details</h2>
        </div>

        {bug.image && (
          <div className="mb-4">
            <img
              src={bug.image}
              alt="Bug screenshot"
              className="w-full h-48 object-cover rounded border"
            />
          </div>
        )}

       <div className="space-y-3 text-sm">
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
                    <p>{bug.status}</p>
                </div>
              </div>

        <div className="mt-6">
          <Button className="w-full" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};