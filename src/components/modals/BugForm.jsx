import React, { useState, useEffect } from "react";
import { BugType, BugStatus } from "@/constants/table";
import { getALLProjects } from "@/services/projects";
import { getDevelopersByProject } from "@/services/bugs";
import { Button } from "../ui/button";

const initialForm = {
  title: "",
  description: "",
  deadline: "",
  type: "",
  image: "",
  status: "",
  project: "",
  developerIDs: [],
};

const BugForm = ({ isOpen , onClose, onSubmit, isEdit, bugData }) => {
  console.log("Edit========================",isEdit)
  console.log("Open========================",isOpen)
  const [form, setForm] = useState(initialForm);
  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingDevs, setLoadingDevs] = useState(false);

  const [file, setFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getALLProjects();
      console.log("Fetched projects", res);
      setProjects(res.data || []);
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

  useEffect(() => {
  if (isEdit && bugData) {
    setForm({
      title: bugData.title || "",
      description: bugData.description || "",
      deadline: bugData.deadline ? bugData.deadline.split("T")[0] : "",
      type: bugData.type || "",
      image: "",
      status: bugData.status || "",
      project: bugData.project?.id || "",
      developerIDs: bugData.assignedTo?.id ? [bugData.assignedTo.id] : [],
    });

    if (bugData.project?.id) {
      fetchDevelopersByProject(bugData.project.id);
    }
  } else {
    setForm(initialForm);
  }
}, [isEdit, bugData]);

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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log("File get", file)
    if (!file) return;

    const allowedTypes = ["image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and GIF allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Max 5MB allowed");
      return;
    }

    setFile(file);
  };

  const handleCheckbox = (id) => {
    setForm((prev) => {
      const isSelected = prev.developerIDs.includes(id);

      return {
        ...prev,
        developerIDs: isSelected ? [] : [id],
      };
    });
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
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Bug" : "Create Bug"}
        </h2>

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
          {!isEdit && (
            <input
              type="file"
              accept="image/png, image/gif"
              className="w-full border p-2 rounded"
              onChange={handleUpload}
            />
          )}

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
          {!isEdit && (
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
          )}
          {!isEdit && (
            <div className="border p-2 rounded max-h-[150px] overflow-y-auto">
              <p className="text-sm font-medium mb-2">Select Developers</p>

              {!form.project ? (
                <p className="text-sm text-gray-500">Select a project first</p>
              ) : loadingDevs ? (
                <p>Loading...</p>
              ) : (
                developers.map((dev) => (
                  <label key={dev.user.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.developerIDs.includes(dev.user.id)}
                      disabled={
                        form.developerIDs.length > 0 &&
                        !form.developerIDs.includes(dev.user.id)
                      }
                      onChange={() => handleCheckbox(dev.user.id)}
                    />
                    {dev.user.name}
                  </label>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onSubmit({ ...form, image: file });
              resetForm();
              onClose();
            }}
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BugForm;
