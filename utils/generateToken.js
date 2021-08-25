const jwt = require("jsonwebtoken");

//generate the token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "3h",
  });
};


module.exports = generateToken;
