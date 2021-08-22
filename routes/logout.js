const distroyToken = require("../utils/distroToken");

const logout = (req, res) => {
  res.send({ token: distroyToken(" ") });
  res.redirect("/");
};
exports.logout = logout;
