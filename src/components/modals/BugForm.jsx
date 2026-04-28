import React, { useState, useEffect } from "react";
import { BugType, BugStatus } from "@/constants/table";
import { getALLProjects } from "@/services/projects";
import { getDevelopersByProject } from "@/services/bugs";

const initialForm = {
  title: "",
  description: "",
  deadline: "",
  type: "",
  status: "",
  project: "",
  developerIDs: [],
};

const BugForm = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);
  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingDevs, setLoadingDevs] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await getALLProjects();
      console.log("Fetched projects", res);
      setProjects(res.projects || res || []);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };


  const fetchDevelopersByProject = async (projectId) => {
    if (!projectId) return;

    setLoadingDevs(true);
    try {
      const data = await getDevelopersByProject(projectId);
      const list = data?.projectUsers || [];
console.log("Fetched developers for project", data);
      setDevelopers(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDevs(false);
    }
  };


  useEffect(() => {
    if (!isOpen) return;
    fetchProjects();
  }, [isOpen]);


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "project") {
      setForm((prev) => ({
        ...prev,
        project: value,
        developerIDs: [],
      }));

      fetchDevelopersByProject(value);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleCheckbox = (id) => {
    setForm((prev) => ({
      ...prev,
      developerIDs: prev.developerIDs.includes(id)
        ? prev.developerIDs.filter((devId) => devId !== id)
        : [...prev.developerIDs, id],
    }));
  };


  const resetForm = () => {
    setForm(initialForm);
    setDevelopers([]);
    setLoadingDevs(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] p-5 rounded shadow">

        <h2 className="text-lg font-semibold mb-4">Create Bug</h2>

        <div className="space-y-3">

        
          <input
            name="title"
            placeholder="Bug Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

         
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />


          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

   
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            {BugType.map((type) => (
              <option key={type.id} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>

  
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            {BugStatus.map((status) => (
              <option key={status.id} value={status.label}>
                {status.label}
              </option>
            ))}
          </select>

        
          <select
            name="project"
            value={form.project}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            ))}
          </select>

          <div className="border p-2 rounded max-h-[150px] overflow-y-auto">
            <p className="text-sm font-medium mb-2">Select Developers</p>

            {!form.project ? (
              <p className="text-sm text-gray-500">
                Select a project first
              </p>
            ) : loadingDevs ? (
              <p>Loading...</p>
            ) : (
              developers.map((dev) => (
                <label
                  key={dev.user.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.developerIDs.includes(dev.user.id)}
                    onChange={() => handleCheckbox(dev.user.id)}
                  />
                  {dev.user.name}
                </label>
              ))
            )}
          </div>
        </div>


        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(form);
              resetForm();
              onClose();
            }}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
};

export default BugForm;