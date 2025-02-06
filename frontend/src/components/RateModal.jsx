import React, { useState } from "react";
import Input from "./Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";

const RateModal = ({ form, handleClose, hotelId, getRates }) => {
  const [rateStartDate, setRateStartDate] = useState(form.rateStartDate || "");
  const [rateEndDate, setRateEndDate] = useState(form.rateEndDate || "");
  const [single, setSingle] = useState(form.single || "");
  const [double, setDouble] = useState(form.double || "");
  const [triple, setTriple] = useState(form.triple || "");
  const [quard, setQuard] = useState(form.quard || "");
  const [sharing, setSharing] = useState(form.sharing || "");

  const handleStartDateChange = (date) => {
    setRateStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setRateEndDate(date);
  };

  // reset
  const handleReset = () => {
    setRateStartDate("");
    setRateEndDate("");
    setSingle("");
    setDouble("");
    setTriple("");
    setQuard("");
    setSharing("");
  };

  // update rates
  const handleEdit = async () => {
    try {
      await axiosInstance.put(`/hotel/rate/${hotelId}/${form._id}`, {
        rateStartDate,
        rateEndDate,
        single,
        double,
        triple,
        quard,
        sharing,
      });
      await getRates();
      toast("Rates Updated successfully");
      handleClose();
    } catch (error) {
      toast("Error updating rates. Please try again later!");
    }
  };

  return (
    <div className="flex absolute z-10 justify-center min-w-[80vw] min-h-[400px]  ml-4 md:m-20 items-center mt-10 lg:mt-20">
      <div className="flex flex-col items-center justify-center bg-purple-400 py-5 rounded-lg max-h-[90vh] overflow-auto w-[90vw] md:w-[80vw] lg:w-[85vw] lg:p-4">
        <h2 className="text-lg font-bold mb-4 mt-32 lg:mt-0">Update Rates</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Start Date
            </label>
            <div className="relative">
              <DatePicker
                selected={rateStartDate}
                required
                onChange={handleStartDateChange}
                dateFormat="MM/dd/yyyy"
                className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:scale-100"
                placeholderText="From Date"
              />
              <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              End Date
            </label>
            <div className="relative">
              <DatePicker
                selected={rateEndDate}
                required
                onChange={handleEndDateChange}
                dateFormat="MM/dd/yyyy"
                className="min-h-10 min-w-[50vw] md:min-w-[40vw] bg-transparent placeholder:text-black border-[2px] rounded-md px-2 border-purple-950 focus:border-[3px] focus:scale-100"
                placeholderText="To Date"
              />
              <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-900">
              Single Rate
            </label>
            <Input
              name="single"
              value={single}
              onChange={(e) => setSingle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-900">
              Double Rate
            </label>
            <Input
              name="double"
              value={double}
              onChange={(e) => setDouble(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-900">
              Triple Rate
            </label>
            <Input
              name="triple"
              value={triple}
              onChange={(e) => setTriple(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-900">
              Quard Rate
            </label>
            <Input
              name="quard"
              value={quard}
              onChange={(e) => setQuard(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-900">
              Sharing Rate
            </label>
            <Input
              name="sharing"
              value={sharing}
              onChange={(e) => setSharing(e.target.value)}
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
            Update Rates
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
