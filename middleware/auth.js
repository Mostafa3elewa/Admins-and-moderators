const jwt = require("jsonwebtoken");
const { isJwtExpired } = require("jwt-check-expiration");
const User = require("../models/user");

const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.redirect("/");
      console.log(error.message);
    }
  } else {
    res.status(401).send("Token invalid").redirect("/");
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
const protectLoginAndRegister = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  // const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!isJwtExpired(req.headers.authorization)) {
    res.redirect("/");
  } else {
    next();
  }
};

exports.protect = protect;
exports.admin = admin;
exports.protectLoginAndRegister = protectLoginAndRegister;