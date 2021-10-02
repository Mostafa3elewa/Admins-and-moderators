const user = require("../models/user");
const User = require("../models/user");

// get specific user by id

const getUser = async (req, res) => {
  id = req.params.id;
  try {
    console.log(await User.findById(id).select("-password"));
    res.send(await User.findById(id).select("-password"));
  } catch (error) {
    res.status(404).send("user not found");
  }
};

const updateUser = async (req, res) => {
  id = req.params.id;

  //prevent to use same phone number of another user

  if (
    await User.findOne({
      mobileNumber: req.body.mobileNumber,
    })
  ) {
    res.status(400).send("mobile already used");
  } else {
    // update user
    try {
      await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            admin: req.body.admin,
            moderator: req.body.moderator,
            mobileNumber: req.body.mobileNumber,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      // send the updated user
      res.send(await User.findById(id).select("-password"));
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  }
};
exports.getUser = getUser;
exports.updateUser = updateUser;
