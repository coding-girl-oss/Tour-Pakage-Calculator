const mongoose = require("mongoose");

const servicePackageSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const ServicePackage = mongoose.model("ServicePackage", servicePackageSchema);

module.exports = ServicePackage;
