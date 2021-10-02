const user = require("../models/user");
const User = require("../models/user");


const getUser = async (req,res)=>{
    console.log("done");
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
    console.log("done");
    id = req.params.id;
    console.log(id);
    try {
        
        await User.findOneAndUpdate ({_id:id},{$set:{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: user.password,
        admin:req.body.admin,
        moderator:req.body.moderator}}, {useFindAndModify:false,new:true},   
        (error,doc)=>{
 if (error) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
    res.send(doc)
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getUser = getUser;
exports.updateUser=updateUser