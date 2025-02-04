const mongoose = require('mongoose')


const connectToDb = async(uri)=>{
    try{
        await mongoose.connect(uri)
        console.log('conneced to db successfullly!')
    }catch(error){
        console.log('error connecting to db!')
    }
}

module.exports = connectToDb