import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import AgentModal from "../components/AgentModal";

const Agent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    isActive: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [agents, setAgents] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // fetching agents
  const getAgents = async () => {
    try {
      const response = await axiosInstance.get("/company/fetch-agents");
      setAgents(response.data.agents);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching agent!";
      toast(errorMessage);
    }
  };

  // adding agents
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userData?.userData?._id) {
        toast("User ID is missing. Please log in again.");
        return;
      }

      const id = userData.userData._id;
      console.log("User ID:", id);

      const formWithUserId = {
        ...form,
        userId: id,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axiosInstance.post(
        "/company/add-agent",
        formWithUserId,
        { headers }
      );

      if (response.status === 201) {
        toast("Agent added successfully!");
        await getAgents();
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          isActive: false,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error adding agent. Please try again.";

      if (errorMessage === "Agent with this email already exists!") {
        toast.error("This email is already registered. Try a different one!");
      } else {
        toast.error(errorMessage);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          isActive: false,
        });
      }
    }
  };

  // deleting agent
  const handleDelete = async (agentId) => {
    try {
      const response = await axiosInstance.delete(
        `/company/delete-agent/${agentId}`
      );

      if (response.status === 200) {
        toast.success("Agent deleted successfully!");
        await getAgents();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting agent.");
    }
  };

  const handleOpen = (agentId) => {
    const agentToEdit = agents.find((agent) => agent._id === agentId);
    setIsOpen(true);
    setForm(agentToEdit);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getAgents();
  }, []);

  return (
    <>
      <div className="relative">
        {isOpen && (
          <AgentModal
            closeModal={closeModal}
            form={form}
            getAgents={getAgents}
          />
        )}
      </div>
      <h1 className="text-5xl text-purple-950 text-center mt-4 font-extrabold uppercase">
        Add Agent
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="min-h-[300px] max-w-[90vw] border-[5px] border-white mx-auto flex justify-center mt-10 md:mt-0 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Name:"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Email:"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <Input
                placeholder="Phone:"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Company:"
                name="company"
                required
                value={form.company}
                onChange={handleChange}
              />
              <Input
                placeholder="Address:"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
              />
              <div className="flex gap-2 mx-2 my-2">
                <h1 className="text-xl font-bold"> Available</h1>
                <input
                  type="checkbox"
                  name="isActive"
                  value={form.isActive}
                  onChange={handleChange}
                  className="h-6 w-6  border-2 border-purple-950 rounded-md bg-purple-500 checked:bg-purple-700 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 md:-mt-10">
          <button
            type="submit"
            className="px-6 py-3 min-w-20 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-800 rounded-md shadow-lg hover:scale-105 hover:from-purple-800 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-950 transition"
          >
            Add Agent
          </button>
        </div>
      </form>

      <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
          <thead>
            <tr className="bg-purple-400 text-gray-800">
              <th className="border border-purple-950 px-4 py-2">Name</th>
              <th className="border border-purple-950 px-4 py-2">Email</th>
              <th className="border border-purple-950 px-4 py-2">Phone</th>
              <th className="border border-purple-950 px-4 py-2">Company</th>
              <th className="border border-purple-950 px-4 py-2">Address</th>
              <th className="border border-purple-950 px-4 py-2">Status</th>
              <th className="border border-purple-950 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="text-center">
                <td className="border border-purple-950 px-4 py-2">
                  {agent.name}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {agent.email}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {agent.phone}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {agent.company}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {agent.address}
                </td>
                <td
                  className={` ${
                    agent.isActive ? "text-green-800" : "text-red-800"
                  } border font-bold border-purple-950 px-4 py-2`}
                >
                  {agent.isActive ? "Available" : "Not Available"}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  <div className="flex justify-center">
                    <button onClick={() => handleOpen(agent._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/nwfpiryp.json"
                        trigger="hover"
                        colors="primary:#fae6d1,secondary:#242424,tertiary:#6c16c7,quaternary:#3a3347"
                        style={{ width: 50, height: 30 }}
                      ></lord-icon>
                    </button>
                    <button onClick={() => handleDelete(agent._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/qnhhgmwn.json"
                        trigger="hover"
                        colors="primary:#646e78,secondary:#e83a30,tertiary:#fae6d1,quaternary:#3a3347"
                        style={{ width: 40, height: 30 }}
                      ></lord-icon>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Agent;
