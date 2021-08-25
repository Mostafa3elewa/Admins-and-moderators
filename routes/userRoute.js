const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const router = express.Router();

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send({ errorMessage: "Email already in use!", token: req.headers.authorization });
  } else if (await User.findOne({ mobileNumber: req.body.mobileNumber })) {
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await user.save();
      res.send({
        errorMessage: "mobile already in use",
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
      //console.log("succed");
    } catch (error) {
      res.status(400).send(error.message);
      console.error(error);
    }
  } else {
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await user.save();
      res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: req.body.mobileNumber,
        token: generateToken(user._id),
      });
      // console.log("succed");
    } catch (error) {
      res.status(400).send(error.message);
      console.error(error);
    }
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.send({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(401).send("email or password is incorrect");
  }
});


module.exports = router;
