const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const router = express.Router();

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email already in use!");
  } else {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await user.save();
      res.send({ name: user.name, email: user.email, token: generateToken(user._id) });
      console.log("succed");
    } catch (error) {
      res.status(400).send(error.message);
      console.error(error);
    }
  }
});

router.post("/login", async (req, res) => {
  // if (req.headers.authorization) {
  let user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    res.send({ _id: user._id, token: generateToken(user._id) });
  } else {
    res.status(401).send("email or password is incorrect");
  }
  // } else
  //  {
  // res.redirect("/");
  // }
});


module.exports = router;
