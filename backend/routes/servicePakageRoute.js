const express = require("express");
const router = express.Router();
const ServicePackage = require("../models/servicePakageModel");

// route to add service pakage

router.post("/", async (req, res) => {
  try {
    const { serviceName, price, guestId } = req.body;

    if (!guestId) {
      return res.status(400).json({ message: "guestId is required" });
    }

    await ServicePackage.create({
      serviceName,
      price,
      guestId,
    });

    res.status(201).json({ message: "Service added successfully for guest" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error adding service for guest",
        error: error.message,
      });
  }
});

// route to get service pakage
router.get("/:id", async (req, res) => {
  try {
    const service = await ServicePackage.find({ guestId: req.params.id });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

// route to delete service pakage
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const service = await ServicePackage.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json("deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

// route to delete all service packages
router.delete("/all/:id", async (req, res) => {
  try {
    const guestId = req.params.id;

    await ServicePackage.deleteMany({ guestId });

    res.status(200).json({ message: "Packages deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
