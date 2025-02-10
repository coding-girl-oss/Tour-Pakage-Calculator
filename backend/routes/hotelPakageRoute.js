const express = require("express");
const router = express.Router();
const HotelPackage = require("../models/hotelPakageModal");

// Add a new package
router.post("/", async (req, res) => {
  try {
    const {
     hotelName,
      hotelCity,
      roomType,
      nightsStay,
      price,
      checkInDate,
      guestId,
    } = req.body;

    if (!guestId || !hotelName || !hotelCity || !roomType || !nightsStay || !price || !checkInDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    await HotelPackage.create({
      hotelName,
      hotelCity,
      roomType,
      nightsStay,
      price,
      checkInDate,
      guestId,
    });

    res
      .status(201)
      .json({ success: true, message: "Package added successfully" });
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// route to get hotel pakages
router.get('/:id',async(req,res)=>{
    try {
        const hotel = await HotelPackage.find({ guestId: req.params.id });
        if (!hotel) {
          return res.status(404).json({ message: "hotel not found" }); 
        }
        res.status(200).json({ hotel });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
      }
})

// route to delete hotel pakage
router.delete('/:id',async(req,res)=>{
    try {
        const id =req.params.id
        const hotel = await HotelPackage.findByIdAndDelete(id)
        if (!hotel) {
          return res.status(404).json({ message: "hotel not found" }); 
        }
        res.status(200).json('deleted successfully');
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
      }
})

// route to delete all hotel pakages
router.delete("/all/:id", async (req, res) => {
  try {
    const guestId = req.params.id;

   await HotelPackage.deleteMany({ guestId });

    res.status(200).json({ message: "Packages deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
});
module.exports = router;
