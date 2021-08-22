const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(401).send("Token invalid");
    console.log("No token");
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).redirect("/");
  }
};

exports.protect = protect;
exports.admin = admin;
