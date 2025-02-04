const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  hotelName: { type: String, required: true },
  type: {
    type: String,
    enum: ["Eco", "Eco Plus", "2 Star", "3 Star", "4 Star", "5 Star"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  distance: { type: Number, required: true },
  isDisabled: { type: Boolean, default: false },
},{timestamps:true});


const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = Hotel