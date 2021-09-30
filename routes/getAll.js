const User = require("../models/user");
    
const getAll = async(req,res)=>{
  let users = [];
  users=await User.find({});
  res.send(users)
}

exports.getAll = getAll;
