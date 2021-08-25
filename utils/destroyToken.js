const jwt = require("jsonwebtoken");
//send invalid token with small expiration time to log out the user
const destroyToken = (space) => {
  return jwt.sign({ space }, process.env.TOKEN_SECRET, { expiresIn: "1" });
};

module.exports = destroyToken;
