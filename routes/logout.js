//@route     get logout
//@desc      logout the user
//@access    private

const destroyToken = require("../utils/destroyToken");
let destroyedtoken;

const logout = (req, res) => {
  //send invalid token with very small expiration date
  res.send({ token: destroyToken(destroyedtoken) });
};
exports.logout = logout;
