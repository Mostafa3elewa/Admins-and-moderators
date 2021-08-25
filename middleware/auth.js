const jwt = require("jsonwebtoken");
const { isJwtExpired } = require("jwt-check-expiration");
const User = require("../models/user");

//check if the user is logged in 

const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      console.log(token);

      //verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      // add user deatils to the request
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
//check if the user logged in is admin or not
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).redirect("/");
  }
};

// protect the login and register page to open if the user is already logged in
const protectLoginAndRegister = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!isJwtExpired(req.headers.authorization) || req.headers.authorization === null) {
      res.redirect("/");
    } else {
      next();
    }
  } else {
    next();
  }
};

exports.protect = protect;
exports.admin = admin;
exports.protectLoginAndRegister = protectLoginAndRegister;