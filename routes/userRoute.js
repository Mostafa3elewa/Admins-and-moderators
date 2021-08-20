const User = require("../models/user");
const express = require("express");
const bcript = require("bcryptjs");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.post("/", jsonParser, async (req, res) => {
  // Check if this user already exisits
  console.log(req.body);

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcript.hashSync(req.body.password, 10),
    });
    await user.save();
    res.send(user);
    console.log("succed");
  } catch (error) {
    res.status(400).send(error.message);
    console.error(error);
  }
});

module.exports = router;
