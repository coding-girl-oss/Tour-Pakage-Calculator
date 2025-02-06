import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";
import Input from "../components/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import RateModal from "../components/RateModal";

const Rate = () => {

  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});
  const [open, setIsOpen] = useState(false);
  const [rates, setRates] = useState([]);
  const [form, setForm] = useState({
    rateStartDate: "",
    rateEndDate: "",
    single: "",
    double: "",
    triple: "",
    quard: "",
    sharing: "",
  });

  // fetching hotel
  const getHotel = async () => {
    try {
      const response = await axiosInstance.get(`/hotel/${hotelId}`);
      setHotel(response.data.hotel);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error fetching hotel. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  // adding rates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      await axiosInstance.post(`/hotel/rate/${hotelId}`, form, headers);

      await getRates();
      setForm({
        rateStartDate: "",
        rateEndDate: "",
        single: "",
        double: "",
        triple: "",
        quard: "",
        sharing: "",
      });
      toast("Added successfully");
    } catch (error) {
      toast("Try again later!");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

 
    
  // fetching rates
  const getRates = async () => {
    try {
      const response = await axiosInstance.get(`/hotel/rate/${hotelId}`);
      setRates(response.data.rates);

      // Deleting expired rates
      const expiredRates = response.data.rates.filter(rate => new Date(rate.rateEndDate) < new Date());
      expiredRates.forEach(async (rate) => {
        try {
          await axiosInstance.delete(`/hotel/rate/${hotelId}/${rate._id}`);
          await getRates()
          toast(`Rate from ${rate.rateStartDate} to ${rate.rateEndDate} deleted due to expiration`);
        } catch (error) {
          toast("Error deleting expired rate!");
        }
      });

    } catch (error) {
      toast("error fetching rates!");
    }
  };

  // deleting rates
  const handleDelete = async (rateId) => {
    try {
      await axiosInstance.delete(`/hotel/rate/${hotelId}/${rateId}`);
      await getRates();
      toast("Deleted successfully");
    } catch (error) {
      toast("error deleting rates!");
    }
  };

  const handleOpen = (rateId) => {
    setIsOpen(true);
    const updateRate = rates.find((rate) => rate._id === rateId);
    setForm(updateRate);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getRates();
  }, []);
  return (
    <>
      {open && (
        <RateModal
          handleClose={handleClose}
          form={form}
          hotelId={hotelId}
          getRates={getRates}
        />
      )}
      <h1 className="text-4xl text-purple-950 text-center mt-4 font-extrabold uppercase">
        Add {hotel.hotelName} Rates
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="min-h-[300px] max-w-[90vw] border-[5px] border-white mx-auto flex justify-center mt-10 md:mt-0 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col gap-3">
              <div className="flex flex-col space-y-2">
                <div className="relative ">
                  <DatePicker
                    selected={form.rateStartDate}
                    name="rateStartDate"
                    required
                    onChange={(date) => handleDateChange(date, "rateStartDate")}
                    dateFormat="MM/dd/yyyy"
                    className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:scale-100 "
                    placeholderText="From Date"
                  />
                  <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="relative ">
                  <DatePicker
                    selected={form.rateEndDate}
                    required
                    name="rateEndDate"
                    onChange={(date) => handleDateChange(date, "rateEndDate")}
                    dateFormat="MM/dd/yyyy"
                    className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:scale-100 "
                    placeholderText="To Date"
                  />
                  <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <Input
                placeholder="Single:"
                name="single"
                value={form.single}
                onChange={handleChange}
              />
              <Input
                placeholder="Double:"
                name="double"
                value={form.double}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <Input
                placeholder="Triple:"
                name="triple"
                value={form.triple}
                onChange={handleChange}
              />
              <Input
                placeholder="Quard:"
                name="quard"
                value={form.quard}
                onChange={handleChange}
              />
              <Input
                placeholder="Sharing:"
                name="sharing"
                value={form.sharing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 md:-mt-10">
          <button
            type="submit"
            className="px-6 py-3 min-w-20 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-800 rounded-md shadow-lg hover:scale-105 hover:from-purple-800 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-950 transition"
          >
            Add Rates
          </button>
        </div>
      </form>

      <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
          <thead>
            <tr className="bg-purple-400 text-gray-800">
              <th className="border border-purple-950 px-4 py-2">From Date</th>
              <th className="border border-purple-950 px-4 py-2">To Date</th>
              <th className="border border-purple-950 px-4 py-2">Single</th>
              <th className="border border-purple-950 px-4 py-2">Double</th>
              <th className="border border-purple-950 px-4 py-2">Triple</th>
              <th className="border border-purple-950 px-4 py-2">Quard</th>
              <th className="border border-purple-950 px-4 py-2">Sharing</th>
              <th className="border border-purple-950 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate._id} className="text-center">
                <td className="border border-purple-950 px-4 py-2">
                  {new Date(rate.rateStartDate).toLocaleDateString()}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {new Date(rate.rateEndDate).toLocaleDateString()}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {rate.single || (
                    <p className="text-red-700 font-bold">Not available</p>
                  )}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {rate.double || (
                    <p className="text-red-700 font-bold">Not available</p>
                  )}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {rate.triple || (
                    <p className="text-red-700 font-bold">Not available</p>
                  )}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {rate.quard || (
                    <p className="text-red-700 font-bold">Not available</p>
                  )}
                </td>
                <td className="border border-purple-950 px-4 py-2">
                  {rate.sharing || (
                    <p className="text-red-700 font-bold">Not available</p>
                  )}
                </td>

                <td className="border border-purple-950 px-4 py-2">
                  <div className="flex justify-center">
                    <button onClick={() => handleOpen(rate._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/nwfpiryp.json"
                        trigger="hover"
                        colors="primary:#fae6d1,secondary:#242424,tertiary:#6c16c7,quaternary:#3a3347"
                        style={{ width: 50, height: 30 }}
                      ></lord-icon>
                    </button>
                    <button onClick={() => handleDelete(rate._id)}>
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

export default Rate;
