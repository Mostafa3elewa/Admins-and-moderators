const jwt = require("jsonwebtoken");
const distroyToken = (space) => {
  return jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

module.exports = distroyToken;
