const User = require("../models/user");

//@route     get getall
//@desc      get all users data
//@access    private

const getAll = async (req, res) => {
  let users = [];
  users = await User.find({}).select("-password");
  res.send(users);
};

exports.getAll = getAll;
