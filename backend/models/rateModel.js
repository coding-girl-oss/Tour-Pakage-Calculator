const mongoose = require("mongoose");
const rateSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  rateStartDate: { type: Date, required: true },
  rateEndDate: { type: Date, required: true },
  roomType: {
    type: String,
    enum: ["Single", "Double", "Triple", "Quad", "Quint"],
    required: true,
  },
  price: { type: Number, required: true },

},{timestamps:true});

const Rate = mongoose.model('Rate', rateSchema)
module.exports = Rate