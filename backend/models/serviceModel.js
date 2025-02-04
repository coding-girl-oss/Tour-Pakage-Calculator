const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: { type: String, required: true },
    servicePrice: { type: String, required: true },
    serviceDetails: { type: String },
    isEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service