import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axios";
import HotelModal from "../components/HotelModal";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);

  const [open, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    hotelName: "",
    type: "",
    city: "",
    distance: "",
    isDisabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // adding hotel
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axiosInstance.post("/hotel/", form, headers);
      setForm({
        hotelName: "",
        type: "",
        city: "",
        distance: "",
        isDisabled: false,
      });
      await getHotels();
      toast.success("Hotel Added Successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error adding hotel. Please try again.";
      toast.error(errorMessage);
    }
  };

  // fetching hotels
  const getHotels = async () => {
    try {
      const response = await axiosInstance.get("/hotel/");
      setHotels(response.data.hotels);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error fetching hotels. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleOpen = (hotelId) => {
    setIsOpen(true);
    const updatedHotel = hotels.find((hotel) => hotel._id === hotelId);
    setForm(updatedHotel);
  };

  // deleting hotel
  const handleDelete = async (hotelId) => {
    try {
      await axiosInstance.delete(`/hotel/${hotelId}`);
      await getHotels();
      toast("Deleted Successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error deleting hotel. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      {open && (
        <HotelModal form={form} getHotels={getHotels} handleClose={setIsOpen} />
      )}

      <h1 className="text-5xl text-purple-950 text-center mt-4 font-extrabold uppercase">
        Add Hotel
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="min-h-[300px] max-w-[90vw] border-[5px] border-white mx-auto flex justify-center mt-10 md:mt-0 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Hotel Name:"
                required
                name="hotelName"
                value={form.hotelName}
                onChange={handleChange}
              />
              <Input
                placeholder="City:"
                required
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <div className="flex flex-col items-start space-y-2">
                <select
                  className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:border-purple-950 focus:scale-100"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="Eco">Eco</option>
                  <option value="Eco plus">Eco plus</option>
                  <option value="2 star">2 star</option>
                  <option value="3 star">3 star</option>
                  <option value="4 star">4 star</option>
                  <option value="5 star">5 star</option>
                </select>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Distance:"
                required
                name="distance"
                value={form.distance}
                onChange={handleChange}
              />

              <div className="flex gap-2 mx-2 my-2">
                <h1 className="text-xl font-bold"> Available</h1>
                <input
                  type="checkbox"
                  name="isDisabled"
                  checked={form.isDisabled}
                  onChange={handleChange}
                  className="h-6 w-6 border-2 border-purple-950 rounded-md bg-purple-500 checked:bg-purple-700 focus:outline-none transition-colors"
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
            Add Hotel
          </button>
        </div>
      </form>

      <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
          <thead>
            <tr className="bg-purple-400 text-gray-800">
              <th className="border border-purple-950 px-4 py-2">HotelName</th>
              <th className="border border-purple-950 px-4 py-2">City</th>
              <th className="border border-purple-950 px-4 py-2">Type</th>
              <th className="border border-purple-950 px-4 py-2">Distance</th>
              <th className="border border-purple-950 px-4 py-2">Available</th>
              <th className="border border-purple-950 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id} className="text-center">
                <td className="border border-purple-950 px-4 py-2">
                  <Link
                    to={`/rate/${hotel._id}`}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    {hotel.hotelName}
                  </Link>
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {hotel.city}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {hotel.type}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {hotel.distance}
                </td>
                <td
                  className={`${
                    hotel.isActive ? "text-green-800" : "text-red-800"
                  } border font-bold border-purple-950 px-4 py-2`}
                >
                  {hotel.isActive ? "Available" : "Not Available"}
                </td>
                <td className="border border-purple-950 py-2">
                  <div className="flex justify-center">
                    <button onClick={() => handleOpen(hotel._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/nwfpiryp.json"
                        trigger="hover"
                        colors="primary:#fae6d1,secondary:#242424,tertiary:#6c16c7,quaternary:#3a3347"
                        style={{ width: 50, height: 30 }}
                      ></lord-icon>
                    </button>
                    <button onClick={() => handleDelete(hotel._id)}>
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

export default Hotel;
