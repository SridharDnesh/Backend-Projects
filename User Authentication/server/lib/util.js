const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(plainTextPassword) {
  return bcrypt.hashSync(plainTextPassword, 10);
}

function verifyPassword(plainTextPassword, storagePassword) {
  return bcrypt.compareSync(plainTextPassword, storagePassword);
}

function issueToken(user) {
  const _id = user._id;

  const expiresIn = "2d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const options = {
    expiresIn,
  };

  const signedToken = jwt.sign(
    payload,
    process.env.JWT_SECRET ? process.env.JWT_SECRET : "a secret",
    options
  );

  const responseToken = {
    token: "Bearer " + signedToken,
    expiresIn,
  };

  return responseToken;
}

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
module.exports.issueToken = issueToken;
