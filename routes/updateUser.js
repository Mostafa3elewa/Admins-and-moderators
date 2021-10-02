const user = require("../models/user");
const User = require("../models/user");


const getUser = async (req,res)=>{
    // console.log("done");
    id = req.params.id;
    console.log(id);
    try {
     console.log(await User.findById(id).select("-password")); 
     res.send(await User.findById(id).select("-password"))
   
        
    } catch (error) {
        res.status(404).send("user not found");
        console.log(error);
    }
    
}

const updateUser =  async (req,res)=>{
    id = req.params.id;
    try {
        
        await User.findOneAndUpdate ({_id:id},{$set:{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        admin:req.body.admin,
        moderator:req.body.moderator,
    mobileNumber:req.body.mobileNumber}},
         {useFindAndModify:false,new:true})
         res.send(await User.findById(id).select("-password"));
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

exports.getUser = getUser;
exports.updateUser=updateUser