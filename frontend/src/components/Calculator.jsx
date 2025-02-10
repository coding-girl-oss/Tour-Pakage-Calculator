import React from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Calculator = ({ hotelPackage = [], servicePackage = [], getHotelPackage, getServicePackage }) => {
  const totalHotelCost = hotelPackage.reduce((acc, hotel) => {
    const hotelPrice = hotel?.price ? parseFloat(hotel.price.replace("$", "")) : 0;
    const nightsStay = hotel?.nightsStay ? parseInt(hotel.nightsStay) : 0;
    return acc + hotelPrice * nightsStay;
  }, 0);

  const totalServiceCost = servicePackage.reduce((acc, service) => {
    const servicePrice = service?.price ? parseFloat(service.price.replace("$", "")) : 0;
    return acc + servicePrice;
  }, 0);

  const totalAmount = totalHotelCost + totalServiceCost;

  const generatePDF = async() => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Calculation Report", 14, 20);

    const tableColumn = ["Item", "Price"];
    const tableRows = [
      ["Total Hotel Amount", `$${totalHotelCost}`],
      ["Total Services Amount", `$${totalServiceCost}`],
      ["Total Amount", `$${totalAmount}`],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("calculation-report.pdf");
    await handleClear()
  };

  const handleClear = async () => {
    const id = localStorage.getItem("guestId");

    try {
      await axiosInstance.delete(`/service-pakage/all/${id}`);
      await axiosInstance.delete(`/hotel-pakage/all/${id}`);
      await getHotelPackage();
      await getServicePackage();

      toast("Packages deleted successfully!");

    } catch (error) {
      toast("Could not delete");
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-[90vw] md:max-w-[90vw] border-4 border-white mt-8 md:mt-4 bg-purple-200 mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl text-purple-950 text-center mt-6 font-extrabold uppercase">
        Summary
      </h1>
      <div className="flex flex-col gap-1 mt-4">
        <p>
          <strong>Total Hotel Nights:</strong>{" "}
          {hotelPackage.reduce((acc, hotel) => acc + parseInt(hotel.nightsStay || 0), 0)}
        </p>
        <p>
          <strong>Total Hotel Amount:</strong> ${totalHotelCost}
        </p>
        <p>
          <strong>Total Services Amount:</strong> ${totalServiceCost}
        </p>
        <p>
          <strong>Total Amount:</strong> ${totalAmount}
        </p>
      </div>
      <div className="text-center mt-4 flex gap-2">
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
          Clear All 
        </button>
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
          PDF 
        </button>
      </div>
    </div>
  );
};

export default Calculator;
