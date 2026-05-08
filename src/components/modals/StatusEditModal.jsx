import { useState } from "react";

const STATUSES = [
  { value: "NEW",       bg: "bg-blue-100",   text: "text-blue-800"   },
  { value: "STARTED",   bg: "bg-amber-100",  text: "text-amber-800"  },
  { value: "RESOLVED",  bg: "bg-green-100",  text: "text-green-800"  },
  { value: "COMPLETED", bg: "bg-teal-100",   text: "text-teal-800"   },
];

export const StatusEditModal = ({ bug, onClose, onSave }) => {
  const isStatus = bug?.status;  
  const [selected, setSelected] = useState(isStatus || "NEW");

  if (!bug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl border border-gray-200 p-6 w-80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-900">Update bug status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Bug: <span className="text-gray-900 font-medium">{bug.title}</span>
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {STATUSES.map((s) => (
            <label
              key={s.value}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="status"
                value={s.value}
                checked={selected === s.value}
                onChange={() => setSelected(s.value)}
              />
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                {s.value}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => { onSave(bug.id, selected); onClose(); }}
            className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded-lg"
          >
            Save status
          </button>
        </div>
      </div>
    </div>
  );
};