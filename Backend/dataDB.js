const connectDB = require("./db/connect");
const  Json_Data = require("./models/jsondata");
const jsondata = require("./jsondata.json")
const start =async () =>{
 try {
    await connectDB();
    await Json_Data.deleteMany();
    await  Json_Data.create(jsondata);
    console.log("success");
 } catch (error) {
    console.log(error);
 }
}



start();