const express = require('express')
const Hotel = require('../models/hotelModel')
const Service = require('../models/serviceModel')
const Rate = require('../models/rateModel')
const router = express.Router()


// route to get all hotels 
router.get('/hotels',async(req,res)=>{
    try {
        const hotels = await Hotel.find()
        res.status(200).json({hotels})

    } catch (error) {
        console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
    }
})

// route to get hotel details
router.get('/hotel-details/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const hotel = await Hotel.findById(id)
        res.status(200).json({hotel})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
})

// route to get all services
router.get('/services',async(req,res)=>{
    try {
        const services = await Service.find()
        res.status(200).json({services})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
})
// route to get  service
router.get('/services/:id',async(req,res)=>{
    try {
        const services = await Service.findById(req.params.id)
        res.status(200).json({services})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
})

// route to get hotel rates
router.get('/rates/:hotelId',async(req,res)=>{
  try {
    const id = req.params.hotelId 
    const rate = await Rate.findById(id)
    res.status(200).json({rate})
  } catch (error) {
    console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error!" });
  }
})

module.exports = router