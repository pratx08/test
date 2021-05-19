//Index page to set up authorization

const authJwt = require("./AuthorizeJWT");
const verifySignUp = require("./verifySignUp");
module.exports = {
  authJwt,
  verifySignUp
};
