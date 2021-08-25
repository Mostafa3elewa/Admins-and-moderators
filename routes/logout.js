const destroyToken = require("../utils/destroyToken");
let destroyedtoken;

const logout = (req, res) => {
  res.send({ token: destroyToken(destroyedtoken) });
};
exports.logout = logout;
