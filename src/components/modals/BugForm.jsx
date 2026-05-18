import React, { useState, useEffect } from "react";
import { BUG_TYPE, BUG_STATUS } from "@/constants/table";
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
  developerID: "", 
};

const BugForm = ({ isOpen, onClose, onSubmit, isEdit, bugData }) => {
  const [form, setForm] = useState(initialForm);
  const [developers, setDevelopers] = useState([]); 
  const [projects, setProjects] = useState([]);
  const [loadingDevs, setLoadingDevs] = useState(false);
  const [file, setFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getALLProjects();
      const acceptedProjects = (res.data || []).filter((project) =>
        project.projectUsers?.some((pu) => pu.acceptInvite === true)
      );
      setProjects(acceptedProjects);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const fetchDevelopersByProject = async (projectId) => {
    if (!projectId) return;
    setLoadingDevs(true);
    try {
      const data = await getDevelopersByProject(projectId);
      setDevelopers(data?.projectUsers || []);
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
        developerID: bugData.assignedTo?.id || "",  
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
        developerID: "",  
      }));
      fetchDevelopersByProject(value);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and GIF allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB allowed");
      return;
    }

    setFile(file);
  };

  const resetForm = () => {
    setForm(initialForm);
    setDevelopers([]);
    setLoadingDevs(false);
    setFile(null);
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
            {BUG_TYPE.map((type) => (
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
            {BUG_STATUS.map((status) => (
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
            <select
              name="developerID"
              value={form.developerID}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={!form.project || loadingDevs}
            >
              <option value="">
                {!form.project
                  ? "Select a project first"
                  : loadingDevs
                  ? "Loading developers..."
                  : "Select Developer"}
              </option>
              {developers.map((dev) => (
                <option key={dev.user.id} value={dev.user.id}>
                  {dev.user.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
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