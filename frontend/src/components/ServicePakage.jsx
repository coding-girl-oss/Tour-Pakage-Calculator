import React from "react";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";


const ServicePackage = ({ service, getServicePackage }) => {
  const handleDelete = async (serviceId) => {
    try {
      await axiosInstance.delete(`/service-pakage/${serviceId}`);
      await getServicePackage();
      toast("Deleted successfully");
    } catch (error) {
      toast("Error deleting service. Please try again later!");
    }
  };

  return (
    <>
 
      <tr className="text-center">
        <td className="border border-purple-950 px-4 py-2">{service.serviceName}</td>
        <td className="border border-purple-950 px-4 py-2">{service.price}</td>
        <td className="border border-purple-950 px-4 py-2">
          <button onClick={() => handleDelete(service._id)}>
            <lord-icon
              src="https://cdn.lordicon.com/qnhhgmwn.json"
              trigger="hover"
              colors="primary:#646e78,secondary:#e83a30,tertiary:#fae6d1,quaternary:#3a3347"
              style={{ width: 40, height: 30 }}
            ></lord-icon>
          </button>
        </td>
      </tr>

     
       </>
  );
};

export default ServicePackage;
