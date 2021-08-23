const jwt = require("jsonwebtoken");
const distroyToken = (space) => {
  return jwt.sign({ space }, process.env.TOKEN_SECRET, { expiresIn: "1" });
};

module.exports = distroyToken;
