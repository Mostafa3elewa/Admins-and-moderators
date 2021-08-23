//const { Router } = require("express");
const distroyToken = require("../utils/distroyToken");
let destroyedtoken;

const logout = (req, res) => {
  console.log(destroyedtoken);
  res.send({ token: distroyToken(destroyedtoken) });
};
exports.logout = logout;
