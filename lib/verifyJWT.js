var jwt = require("jsonwebtoken");

const verifyJWT = (token, callback) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    callback(err, decoded);
  });
};

module.exports = verifyJWT;
