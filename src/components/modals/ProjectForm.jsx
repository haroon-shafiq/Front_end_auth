'use client';

import { useState, useEffect } from "react";
import { getDevelopers, createProject } from "@/services/projects";
import { Button } from "../ui/button";

const AddProjectModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    deadline: "",
    developerIDs: [],
  });

  const [developers, setDevelopers] = useState([]);
  const [loadingDevs, setLoadingDevs] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchDevelopers = async () => {
      setLoadingDevs(true);
      try {
        const data = await getDevelopers();
        setDevelopers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDevs(false);
      }
    };

    fetchDevelopers();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCheckbox = (id) => {
  const alreadySelected = form.developerIDs.includes(id);

  let updatedDevelopers;

  if (alreadySelected) {
    updatedDevelopers = form.developerIDs.filter((devId) => devId !== id);
  } else {
    updatedDevelopers = [...form.developerIDs, id];
  }

  setForm({
    ...form,
    developerIDs: updatedDevelopers,
  });
};

  const handleSubmit = async () => {
    try {
      await createProject(form);
      onClose();
      setForm({
        name: "",
        description: "",
        deadline: "",
        developerIDs: [],
      });
    } catch (err) {
      console.error("Create project error", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Project Name"
            value={form.name}
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

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />


          <div className="border p-2 rounded max-h-[150px] overflow-y-auto">
            <p className="text-sm font-medium mb-2">Select Developers</p>

            {loadingDevs && <p>Loading...</p>}

            {developers.map((dev) => (
              <label key={dev.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.developerIDs.includes(dev.id)}
                  onChange={() => handleCheckbox(dev.id)}
                />
                {dev.email}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;