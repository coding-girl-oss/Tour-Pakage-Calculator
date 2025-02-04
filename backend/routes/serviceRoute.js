const express = require("express");
const verifyauth = require("../middleware/user");
const Service = require("../models/serviceModel");
const router = express.Router()

// Route to add service 
router.post('/',verifyauth,async(req,res)=>{
    const {  serviceName,  servicePrice, serviceDetails,  isEnabled} = req.body
    const id = req.user.id
    if(!serviceName || !servicePrice || !serviceDetails){
      return res.status(401).send("Missing required fields!");
    }
    try {
        await Service.create({serviceName,servicePrice,serviceDetails,isEnabled,userId:id})
        res.status(201).send("Created successfully!")
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
})

// Route to get company services
router.get("/", verifyauth, async (req, res) => {
    try {
      const userId = req.user.id; 
      const services = await Service.find({ userId });
  
      res.status(200).json(services);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  });

//   Route to delete company service
router.delete('/:id', verifyauth, async (req, res) => {
    try {
      
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }

        if (req.user.id !== service.userId.toString()) {
            return res.status(403).json({ message: "Not allowed!" });
        }
        await Service.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Service deleted successfully!" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Router to edit company service
router.put('/:id',verifyauth,async(req,res)=>{
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        if (req.user.id !== service.userId.toString()) {
            return res.status(403).json({ message: "Not allowed!" });
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return res.status(200).json({ message: "Service updated successfully!",updatedService });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
})

module.exports = router