const jwt = require("jsonwebtoken");
const destroyToken = (space) => {
  return jwt.sign({ space }, process.env.TOKEN_SECRET, { expiresIn: "1" });
};

module.exports = destroyToken;
