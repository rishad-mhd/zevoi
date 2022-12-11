var jwt = require("jsonwebtoken");

const generateJWt = (data) => {
  let token = jwt.sign({ _id:data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = generateJWt;
