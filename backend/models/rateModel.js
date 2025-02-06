const mongoose = require("mongoose");
const rateSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  rateStartDate: { type: Date, required: true },
  rateEndDate: { type: Date, required: true },
  single:{
    type : String,
  },
  double:{
    type : String,
  },
  triple:{
    type : String,
  },
  quard:{
    type : String,
  },
  sharing:{
    type : String,
  },

},{timestamps:true});

const Rate = mongoose.model('Rate', rateSchema)
module.exports = Rate