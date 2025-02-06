import React, { useState } from "react";
import Input from "./Input";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const HotelModal = ({ form, getHotels, handleClose }) => {
  const [hotelName, setHotelName] = useState(form.hotelName || "");
  const [city, setCity] = useState(form.city || "");
  const [type, setType] = useState(form.type || "");
  const [distance, setDistance] = useState(form.distance || "");
  const [isActive, setIsActive] = useState(form.isActive || false);

  const handleReset = () => {
    setHotelName(form.hotelName || "");
    setCity(form.city || "");
    setType(form.type || "");
    setDistance(form.distance || "");
    setIsActive(form.isActive || false);
  };

  // updating hotels
  const handleEdit = async () => {
    try {
      const response = await axiosInstance.put(`/hotel/${form._id}`, {
        hotelName,
        city,
        type,
        distance,
        isActive,
      });

      if (response.status === 200) {
        toast.success("Hotel updated successfully!");
        await getHotels();
        handleClose();
      }
    } catch (error) {
      toast.error("Error updating hotel. Please try again!");
    }
  };

  return (
    <div className="flex absolute z-10 justify-center min-w-[80vw] min-h-[400px] mx-10 items-center mt-20">
      <div className="flex flex-col items-center justify-center bg-purple-400 p-6 rounded-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">Update Hotel</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <Input
            label="Hotel Name"
            name="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
          <Input
            label="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="flex flex-col">
            <label className="font-bold">Type</label>
            <select
              className="h-10 w-full bg-transparent border-2 rounded-md px-2 border-purple-950 focus:border-[3px] focus:border-purple-950"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Eco">Eco</option>
              <option value="Eco plus">Eco plus</option>
              <option value="2 star">2 star</option>
              <option value="3 star">3 star</option>
              <option value="4 star">4 star</option>
              <option value="5 star">5 star</option>
            </select>
          </div>

          <Input
            label="Distance"
            name="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

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
          <button
            className="btn bg-purple-500 text-white"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="btn bg-purple-500 text-white" onClick={handleEdit}>
            Update Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelModal;
