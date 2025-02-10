const express = require('express')
const verifyauth = require('../middleware/user')
const Rate = require('../models/rateModel')
const router = express.Router()

// Route to add rates
router.post('/:id',verifyauth,async(req,res)=>{
    const { rateStartDate,rateEndDate,single,double,triple,quard,sharing} = req.body
 
    try {
      await Rate.create({ rateStartDate,rateEndDate,single,double,triple,quard,sharing,hotelId:req.params.id})
        res.status(201).send("Rates added!")
    } catch (error) {
         console.error(error.message);
        res.status(500).json({ message: "Internal Server Error!"});
    }
})

// Route to get rates
router.get('/:id',async(req,res)=>{
    try {
        const rates = await Rate.find({hotelId:req.params.id})
        res.status(200).json({rates})
    } catch (error) {
        console.error(error.message);
       res.status(500).json({ message: "Internal Server Error!" });
    }
})

// route to delete rate
router.delete("/:hotelId/:rateId", verifyauth, async (req, res) => {
    try {
        const { hotelId, rateId } = req.params;
        const rate = await Rate.findById(rateId);

        if (!rate) {
            return res.status(404).json({ message: "Rate not found!" });
        }

        if (rate.hotelId.toString() !== hotelId) {
            return res.status(403).json({ message: "Unauthorized! Rate does not belong to this hotel." });
        }

        await Rate.findByIdAndDelete(rateId);

        res.status(200).json({ message: "Rate deleted successfully!" });
    } catch (error) {
        console.error("Error deleting rate:", error.message);
         res.status(500).json({ message: "Internal Server Error!" });
    }
});

// route to update rates
router.put('/:hotelId/:rateId',verifyauth,async(req,res)=>{
    try {
        const {hotelId, rateId}  = req.params
        const rate = await Rate.findById(rateId)
        if(!rate){
            return res.status(404).json({ message: "Rate not found!" });
        }
        if(rate.hotelId.toString() !== hotelId){
            return res.status(403).json({ message: "Unauthorized! Rate does not belong to this hotel." });
        }
      const updated =  await Rate.findByIdAndUpdate(rateId,req.body,{new:true})
        res.status(200).json({ message: "Rate deleted successfully!",updated });
    } catch (error) {
        console.error("Error deleting rate:", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
})
module.exports = router