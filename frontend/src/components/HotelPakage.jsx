import React from "react";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const HotelPakage = ({ hotel, getHotelPackage }) => {
  const handleDelete = async (hotelId) => {
    try {
      await axiosInstance.delete(`/hotel-pakage/${hotelId}`);
      await getHotelPackage();
      toast("Hotel added successfully!");
    } catch (error) {
      toast("Hotel deleted successfully!");
    }
  };
  return (
    <>
      <tr className="text-center">
        <td className="border border-purple-950 px-4 py-2">
          {hotel.hotelName}
        </td>
        <td className="border border-purple-950 px-4 py-2">
          {hotel.hotelCity}
        </td>
        <td className="border border-purple-950 px-4 py-2">{hotel.roomType}</td>
        <td className="border border-purple-950 px-4 py-2">
          {" "}
          {new Date(hotel.checkInDate).toUTCString()}
        </td>
        <td className="border border-purple-950 px-4 py-2">
          {hotel.nightsStay}
        </td>
        <td className="border border-purple-950 px-4 py-2">{hotel.price}</td>
        <td className="border border-purple-950 px-4 py-2">
          <button onClick={() => handleDelete(hotel._id)}>
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

export default HotelPakage;
