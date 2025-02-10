const mongoose = require("mongoose");

const HotelPackageSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    hotelCity: { type: String, required: true },
    roomType: { type: String, required: true },
    nightsStay: { type: String, required: true },
    price: { type: String, required: true },
    checkInDate:{type :Date, required: true },
    guestId: { type: String, required: true },
  },
  { timestamps: true }
);

const HotelPackage = mongoose.model("HotelPackage", HotelPackageSchema);
module.exports = HotelPackage;
