const Json_Data =  require("../models/jsondata")



const getAllData =async(req,res) =>{
    let apiData = Json_Data.find(req.query) 
   

    const myData = await apiData        

    if(myData.length===0){
        res.json({msg:"No Data Found"});
    }else{
        
        res.status(200).json({myData});
    }
};

const getAllDataTesting = async(req,res) =>{
    const myData = await Json_Data.find(req.query)     
    if(myData.length===0){
        res.json({msg:"No Data Found"});
    }else{
        
        res.status(200).json({myData});
    }
}

const jsondatawithlimit = async(req,res) =>{
    const { limit = 50 } = req.query; // Default to 25 if 'limit' is not provided

    // Use the 'limit' value in the find query
    const myData = await Json_Data.find(req.query).limit(parseInt(limit, 10));
  
    if (myData.length === 0) {
      res.json({ msg: "No Data Found" });
    } else {
      res.status(200).json({ myData });
    }
}

module.exports = {getAllData,getAllDataTesting,jsondatawithlimit};