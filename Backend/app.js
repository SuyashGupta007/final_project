const express = require("express");
const app = express();
const PORT = process.env.PORT||5000
const data_routes = require("./routes/jsondata");
const connectDB = require("./db/connect")
const cors = require('cors');

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hii I'm Live");

})
//middleware or router
app.use("/api/jsondata", data_routes);

const start = async () =>{
 try {
    await connectDB();
    app.listen(PORT,()=>{
       console.log (`${PORT} Yes I am connected`);
    })
 } catch (error) {
    console.log(error)
 }
};
start();