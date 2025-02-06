const express = require("express");
const verifyauth = require("../middleware/user");
const Hotel = require("../models/hotelModel");
const router = express.Router()

// Route to add hotel
router.post("/", verifyauth, async (req, res) => {
    try {
      const { hotelName, type, city, distance,isActive } = req.body;
 
      if (!hotelName || !type || !city || !distance) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const newHotel = new Hotel({
        userId: req.user.id,
        hotelName,
        type,
        city,
        distance,
        isActive
      });
  
      await newHotel.save();
      res.status(201).json({ success: true, message: "Hotel added successfully"});
  
    } catch (error) {
      console.error("Error adding hotel:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

//   Route to get hotels of user
router.get('/',verifyauth,async(req,res)=>{
    const id = req.user.id
   try {
     const hotels = await Hotel.find({userId:id})
     res.status(201).json({hotels})
   } catch (error) {
    console.error("Error fetching hotels:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
})

// route to get one hotel
router.get('/:id', verifyauth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Route to delete hotel of user
router.delete('/:id',verifyauth,async(req,res)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        if(!hotel){
           return res.status(404).send("Hotel not found!")
        }
        if(req.user.id !== hotel.userId.toString()){
            return res.status(403).send("Not allowed!")
        }
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send("Hotel deleted successfully!")
    } catch (error) {
        console.error("Error deleting hotels:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// Router to edit user hotel
router.put('/:id',verifyauth,async(req,res)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        if(!hotel){
           return res.status(404).send("Hotel not found!")
        }
        if(req.user.id !== hotel.userId.toString()){
            return res.status(403).send("Not allowed!")
        }
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({updatedHotel})
    } catch (error) {
        console.error("Error updating hotels:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router