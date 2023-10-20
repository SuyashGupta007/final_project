const mongoose = require('mongoose')
const { options } = require('../routes/jsondata')

const connectDB = () =>{
    return mongoose.connect("mongodb://localhost:27017/balckclover",{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>console.log("Connection successfull...")).catch((err)=>console.log(err));
}

module.exports = connectDB;