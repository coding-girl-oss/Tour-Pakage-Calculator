import React, { useState } from "react";
import Input from "./Input";
import toast from "react-hot-toast";
import {axiosInstance} from "../utils/axios";

const AgentModal = ({ closeModal, form,getAgents }) => {
  const [name, setName] = useState(form.name || "Default Name");
  const [company, setCompany] = useState(form.company || "Default Company");
  const [email, setEmail] = useState(form.email || "");
  const [address, setAddress] = useState(form.address || "");
  const [phone, setPhone] = useState(form.phone || "");
  const [isActive, setIsActive] = useState(form.isActive || false);

  // updatong agents
  const handleEdit = async () => {
    try {
      const response = await axiosInstance.put(`/company/update-agent/${form._id}`, {
        name,
        company,
        email,
        address,
        phone,
        isActive,
      });
      if (response.status === 200) {
        toast.success("Agent updated successfully!");
        await getAgents()
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating agent!");
    }
  };

  const handleReset = () => {
    setName(form.name || "Default Name");
    setCompany(form.company || "Default Company");
    setEmail(form.email || "");
    setAddress(form.address || "");
    setPhone(form.phone || "");
    setIsActive(form.isActive || false);
  };

  return (
    <div className="flex absolute z-10 justify-center min-w-[80vw] min-h-[400px] mx-10 items-center mt-20">
      <div className="flex flex-col items-center justify-center bg-purple-400 p-6 rounded-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">Update Agent</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Input label="Phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <div className="flex items-center gap-2">
            <label className="font-bold">Available</label>
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="checkbox checkbox-primary"
            />
          </div>
        </div>

        <div className="modal-action mt-4 flex gap-2">
          <button className="btn bg-gray-500 text-white" onClick={handleReset}>
            Reset
          </button>
          <button className="btn bg-purple-500 text-white" onClick={closeModal}>
            Close
          </button>
          <button className="btn bg-purple-500 text-white" onClick={handleEdit}>
            Update Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;

