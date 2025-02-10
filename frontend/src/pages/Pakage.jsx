import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServicePakage from "../components/servicePakage";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import HotelPakage from "../components/HotelPakage";
import Calculator from "../components/Calculator";

const Pakage = () => {
  // Generate Guest ID
  const generateGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  const [form, setForm] = useState({});
  const [form2, setForm2] = useState({});
  const [hotels, setHotels] = useState([]);
  const [hotelDetails, setHotelDetails] = useState({});
  const [hotelRates, setHotelRates] = useState({});
  const [services, setServices] = useState([]);
  const [servicePrice, setServicePrice] = useState({});
  const [servicePackage, setServicePackage] = useState();
  const [hotelPackage,setHotelPackage] = useState()
  const guestId = generateGuestId();

  // Function to generate and store guestId
  const getServicePackage = async () => {
    try {
      const id = localStorage.getItem("guestId");

      if (!id) {
        console.log("No service ID found in localStorage");
        return;
      }

      const response = await axiosInstance.get(`/service-pakage/${id}`);
      setServicePackage(response.data.service);
    } catch (error) {
      console.log(error);
    }
  };
  const getHotelPackage = async () => {
    try {
      const id = localStorage.getItem("guestId");

      if (!id) {
        console.log("No service ID found in localStorage");
        return;
      }

      const response = await axiosInstance.get(`/hotel-pakage/${id}`);
      setHotelPackage(response.data.hotel);
  
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetHotels();
    handleGetServices();
    getServicePackage();
    getHotelPackage()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      serviceName: form.serviceName,
      price: servicePrice?.servicePrice || null,
      guestId,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axiosInstance.post("/service-pakage/", data, headers);
      await getServicePackage();
      toast("Service added successfully!");
      setForm({});
    } catch (error) {
      toast.error("Error adding service. Please try again later.");
    }
  };

  
  const handleSubmit2=async(e)=>{
    e.preventDefault();
    const data = {
      nightsStay: form.nightsStay,
      price: hotelRates[form.roomType.toLowerCase()] || null,
      hotelName: form2.hotelName,
      hotelCity : form2.hotelCity,
      roomType :form2.roomType,
      checkInDate : form.checkInDate,
      guestId,
    };
    console.log(data)
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      await axiosInstance.post("/hotel-pakage/", data, headers);
      await getHotelPackage()
      toast("Hotel added successfully!");
      setForm({});
    } catch (error) {
      toast.error("Error adding hotel. Please try again later.");
    }
  }

  // Handle Date Picker Change
  const handleDateChange = (date, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  // Handle Input Change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch Hotels List
  const handleGetHotels = async () => {
    try {
      const response = await axiosInstance.get("/display/hotels");
      setHotels(response.data.hotels);
    } catch (error) {
      toast.error("Error fetching hotels");
    }
  };

  // Fetch Hotel Details and Rates when a hotel is selected
  const handleHotelSelection = async (e) => {
    const hotelId = e.target.value;
    const selectedHotel = hotels.find((hotel)=>hotel._id === hotelId)

    setForm2((prev) => ({
      ...prev,
      hotelId,
      hotelName : selectedHotel?.hotelName || '',
      hotelCity : selectedHotel?.city || '',
      roomType : selectedHotel?.type
      
      
    }));

    if (!hotelId) return;

    try {
      // Fetch hotel details
      const detailsResponse = await axiosInstance.get(
        `/display/hotel-details/${hotelId}`
      );
      setHotelDetails(detailsResponse.data.hotel);

      // Fetch hotel rates
      const response = await axiosInstance.get(`/hotel/rate/${hotelId}`);
      setHotelRates(response.data.rates[0]);
    } catch (error) {
      toast.error("Error fetching hotel data");
    }
  };

  // Fetch Service Details when a service is selected
  const handleServiceSelection = async (e) => {
    const serviceId = e.target.value;
    const selectedService = services.find(
      (service) => service._id === serviceId
    );

    setForm((prev) => ({
      ...prev,
      serviceId, 
      serviceName: selectedService?.serviceName || "", 
    }));

    if (!serviceId) return;

    try {
      const response = await axiosInstance.get(
        `/display/services/${serviceId}`
      );
      setServicePrice(response.data.services);
    } catch (error) {
      toast.error("Error fetching service data");
    }
  };

  // Fetch all services
  const handleGetServices = async () => {
    try {
      const response = await axiosInstance.get("/display/services");
      setServices(response.data.services);
    } catch (error) {
      toast.error("Error fetching services");
    }
  };


  return (
    <>
      <h1 className="text-4xl text-purple-950 text-center mt-6 font-extrabold uppercase">
        Calculate your Tour Package
      </h1>

      <form onSubmit={handleSubmit2} className="max-w-[90vw] md:max-w-[90vw] border-4 border-white mt-8 md:mt-4 bg-purple-200 mx-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-purple-950 text-center font-bold uppercase mb-4">
          Add Hotel
        </h1>
        {/* Hotel Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="hotelId"
                className="text-xl font-semibold text-purple-950"
              >
                Hotel
              </label>
              <select
                className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
                name="hotelId"
                required
                value={form2.hotelId || ""}
                onChange={handleHotelSelection}
              >
                <option value="">Select a hotel</option>
                {hotels.map((hotel) => (
                  <option
                    disabled={hotel.isActive === false}
                    key={hotel._id}
                    value={hotel._id}
                  >
                    {hotel.hotelName}
                  </option>
                ))}
              </select>
            </div>
            {/* Readonly Hotel Details */}
            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="hotelCity"
                className="text-xl font-semibold text-purple-950"
              >
                Hotel City
              </label>
              <input
                placeholder="Hotel City"
                className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
                name="hotelCity"
                value={hotelDetails.city || ""}
                readOnly
              />
            </div>
          </div>

          {/* Room and Date Details */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="roomType"
                className="text-xl font-semibold text-purple-950"
              >
                Room Type
              </label>
              <select
                className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
                name="roomType"
                value={form.roomType || ""}
                required
                onChange={handleChange}
                disabled={!hotelRates || Object.keys(hotelRates).length === 0}
              >
                <option value="">Select Room Type</option>
                {hotelRates && Object.keys(hotelRates).length > 0 ? (
                  <>
                    <option value="Single">
                      Single - {hotelRates.single || "N/A"}
                    </option>
                    <option value="Double">
                      Double - {hotelRates.double || "N/A"}
                    </option>
                    <option value="Triple">
                      Triple - {hotelRates.triple || "N/A"}
                    </option>
                    <option value="Quad">
                      Quad - {hotelRates.quad || "N/A"}
                    </option>
                    <option value="Sharing">
                      Sharing - {hotelRates.sharing || "N/A"}
                    </option>
                  </>
                ) : (
                  <option disabled>Loading rates...</option>
                )}
              </select>
            </div>
         

            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="nightsStay"
                className="text-xl font-semibold text-purple-950"
              >
                Nights Stay
              </label>
              <input
                className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
                placeholder="Nights Stay"
                required
                name="nightsStay"
                value={form.nightsStay || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="checkInDate"
                className="text-xl font-semibold text-purple-950"
              >
                Check-In Date
              </label>
              <DatePicker
                selected={form.checkInDate}
                required
                onChange={(date) => handleDateChange(date, "checkInDate")}
                name="checkInDate"
                className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-3 mt-5 min-w-20 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-800 rounded-md shadow-lg hover:scale-105 hover:from-purple-800 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-950 transition"
        >
          Add Hotel
        </button>
      </form>

      { hotelPackage?.length>0? ( <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
          <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
            <thead>
              <tr className="bg-purple-400 text-gray-800">
                <th className="border border-purple-950 px-4 py-2">HotelName</th>
                <th className="border border-purple-950 px-4 py-2">HotelCity</th>
                <th className="border border-purple-950 px-4 py-2">RoomType</th>
                <th className="border border-purple-950 px-4 py-2">CheckInDate</th>
                <th className="border border-purple-950 px-4 py-2">NightsStay</th>
                <th className="border border-purple-950 px-4 py-2">Price</th>
                <th className="border border-purple-950 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {hotelPackage.map((hotel) => (
                <HotelPakage
                  key={hotel._id}
                  getHotelPackage={getHotelPackage}
                  hotel={hotel}
                />
              ))}
            </tbody>
          </table>
        </div>):( <p className="mt-10 mb-10 text-center">No hotel to display</p>)}
       {/* Service Section  */}
      <form
        onSubmit={handleSubmit}
        className="max-w-[90vw] md:max-w-[90vw] border-4 border-white mt-8 md:mt-4 bg-purple-200 mx-auto p-6 rounded-lg shadow-lg"
      >
         <h1 className="text-3xl text-purple-950 text-center font-bold uppercase mb-4">
          Add Service
        </h1>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-start space-y-2">
            <label
              htmlFor="serviceId"
              className="text-xl font-semibold text-purple-950"
            >
              Select Service
            </label>
            <select
              className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
              name="serviceId"
              required
              value={form.serviceId || ""}
              onChange={handleServiceSelection}
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.serviceName} - ${service.servicePrice || "N/A"}
                </option>
              ))}
            </select>
          </div>
          {/* Selected Service Details */}
          <div className="flex flex-col items-start space-y-2">
            <label
              htmlFor="servicePrice"
              className="text-xl font-semibold text-purple-950"
            >
              Service Price
            </label>
            <input
              placeholder="Service Price"
              className="h-10 w-full md:w-[80%] bg-transparent placeholder:text-black border-2 rounded-md px-3 border-purple-950 focus:border-3 focus:border-purple-950 focus:scale-100"
              name="servicePrice"
              value={servicePrice.servicePrice || ""}
              readOnly
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 mt-5 min-w-20 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-800 rounded-md shadow-lg hover:scale-105 hover:from-purple-800 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-950 transition"
        >
          Add Service
        </button>
      </form>
      {servicePackage?.length > 0 ? (
        <div className="min-w-[90vw] max-w-[90vw] mx-auto mb-10 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
          <table className="w-full min-w-max border-collapse border border-purple-950 mt-6">
            <thead>
              <tr className="bg-purple-400 text-gray-800">
                <th className="border border-purple-950 px-4 py-2">Name</th>
                <th className="border border-purple-950 px-4 py-2">Price</th>
                <th className="border border-purple-950 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {servicePackage.map((service) => (
                <ServicePakage
                  key={service._id}
                  getServicePackage={getServicePackage}
                  service={service}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-10 mb-10 text-center">No service to display</p>
      )}
      <Calculator hotelPackage={hotelPackage} getHotelPackage={getHotelPackage} getServicePackage={getServicePackage} servicePackage={servicePackage}/>
    </>
  );
};

export default Pakage;
