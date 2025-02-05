const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelName: { type: String, required: true },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  distance: { type: String, required: true },
  isActive: { type: Boolean, default: false },
},{timestamps:true});


const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = Hotel