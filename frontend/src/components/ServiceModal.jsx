import React, { useState } from "react";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

const ServiceModal = ({ form, handleClose, getServices }) => {
  const [serviceName, setServiceName] = useState(form.serviceName || "");
  const [servicePrice, setServicePrice] = useState(form.servicePrice || "");
  const [serviceDetails, setServiceDetails] = useState(form.serviceDetails || "");
  const [isEnabled, setIsEnabled] = useState(form.isEnabled || false);

  // updating service
  const handleEdit = async () => {
    try {
      const response = await axiosInstance.put(`/service/${form._id}`, {
        serviceName,
        servicePrice,
        serviceDetails,
        isEnabled,
      });

      if (response.status === 200) {
        toast.success("Service updated successfully!");
        await getServices(); 
        handleClose()
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Error updating service.");
    }
  };

  const handleReset = () => {
    setServiceName(form.serviceName || "");
    setServicePrice(form.servicePrice || "");
    setServiceDetails(form.serviceDetails || "");
    setIsEnabled(form.isEnabled || false);
  };

  return (
    <>
      <div className="flex absolute z-10 justify-center min-w-[80vw] min-h-[400px] mx-10 items-center mt-10">
        <div className="flex flex-col items-center justify-center bg-purple-400 p-6 rounded-lg overflow-auto">
          <h2 className="text-lg font-bold mb-4">Update Service</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <Input
              label="Price"
              name="servicePrice"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
            />
            <Input
              label="Details"
              name="serviceDetails"
              value={serviceDetails}
              onChange={(e) => setServiceDetails(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <label className="font-bold">Available</label>
              <input
                type="checkbox"
                name="isEnabled"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                className="checkbox checkbox-primary"
              />
            </div>
          </div>

          <div className="modal-action mt-4 flex gap-2">
            <button className="btn bg-gray-500 text-white" onClick={handleReset}>
              Reset
            </button>
            <button className="btn bg-purple-500 text-white" onClick={handleClose}>
              Close
            </button>
            <button className="btn bg-purple-500 text-white" onClick={handleEdit}>
              Update Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
