import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import ServiceModal from "../components/ServiceModal";

const Service = () => {
  const [services, setServices] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    serviceName: "",
    servicePrice: "",
    serviceDetails: "",
    isEnabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // adding service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/service", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setForm({
          serviceName: "",
          servicePrice: "",
          serviceDetails: "",
          isEnabled: false,
        });
        await getServices();
        toast.success("Service added successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding service.");
    }
  };

  // fetching services
  const getServices = async () => {
    try {
      const response = await axiosInstance.get("/service");
      if (response.status === 200) {
        setServices(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching services.");
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleOpen = (serviceId) => {
    const updatedService = services.find((service) => service._id === serviceId);
    setForm(updatedService);
    setIsOpen(true); 
  };

  const handleClose = () => {
    setIsOpen(false);
    setForm({
      serviceName: "",
      servicePrice: "",
      serviceDetails: "",
      isEnabled: false,
    }); 
  };

  // deleting service

  const handleDelete = async (serviceId) => {
    try {
      const response = await axiosInstance.delete(`/service/${serviceId}`);
      if (response.status === 200) {
        toast("Service deleted successfully!");
        await getServices();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting service.");
    }
  };

  return (
    <>
      {open && (
        <ServiceModal
          form={form}
          handleClose={handleClose}
          getServices={getServices}
        />
      )}
      <h1 className="text-5xl text-purple-950 text-center mt-4 font-extrabold uppercase">
        Add Service
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="min-h-[300px] max-w-[90vw] border-[5px] border-white mx-auto flex justify-center mt-10 md:mt-0 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Service Name"
                name="serviceName"
                required
                value={form.serviceName}
                onChange={handleChange}
              />
              <Input
                placeholder="Service Price"
                name="servicePrice"
                required
                value={form.servicePrice}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <textarea
                placeholder="Service Details"
                name="serviceDetails"
                className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 py-1 border-purple-950 focus:border-[3px] focus:scale-100"
                value={form.serviceDetails}
                onChange={handleChange}
              />
              <div className="flex gap-2 mx-2 my-2">
                <h1 className="text-xl font-bold">Available</h1>
                <input
                  type="checkbox"
                  name="isEnabled"
                  checked={form.isEnabled}
                  onChange={handleChange}
                  className="h-6 w-6 border-2 border-purple-950 rounded-md bg-purple-500 checked:bg-purple-700 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center -mt-10">
          <button
            type="submit"
            className="px-6 py-3 min-w-20 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-800 rounded-md shadow-lg hover:scale-105 hover:from-purple-800 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-950 transition"
          >
            Add Service
          </button>
        </div>
      </form>

      <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
          <thead>
            <tr className="bg-purple-400 text-gray-800">
              <th className="border border-purple-950 px-4 py-2">ServiceName</th>
              <th className="border border-purple-950 px-4 py-2">ServicePrice</th>
              <th className="border border-purple-950 px-4 py-2">ServiceDetails</th>
              <th className="border border-purple-950 px-4 py-2">Status</th>
              <th className="border border-purple-950 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="text-center">
                <td className="border border-purple-950 px-4 py-2">
                  {service.serviceName}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {service.servicePrice}
                </td>
                <td className="border border-purple-950 text-wrap max-w-[100px] min-w-[100px]  px-4 py-2">
                  {service.serviceDetails}
                </td>
                <td
                  className={`${
                    service.isEnabled ? "text-green-800" : "text-red-800"
                  } border font-bold border-purple-950 px-4 py-2`}
                >
                  {service.isEnabled ? "Available" : "Not Available"}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  <div className="flex justify-center">
                    <button onClick={() => handleOpen(service._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/nwfpiryp.json"
                        trigger="hover"
                        colors="primary:#fae6d1,secondary:#242424,tertiary:#6c16c7,quaternary:#3a3347"
                        style={{ width: 50, height: 30 }}
                      ></lord-icon>
                    </button>
                    <button onClick={() => handleDelete(service._id)}>
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

export default Service;
