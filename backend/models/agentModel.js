const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company:{
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false, 
     
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
module.exports = Agent;
