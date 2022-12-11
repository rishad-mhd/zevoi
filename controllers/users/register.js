const express = require("express");
const { Users } = require("../../models/Users");
// const { v4: uuidV4 } = require("uuid");
const generateJWt = require("../../lib/generateJWT");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  let { email, password, username, phone } = req.body;
  let user = await Users.findOne({ email });
  if (user) {
    return res.status(403).send({ message: "User already exist" });
  }

  let newUser = new Users({ username, email, phone, password, status: 1 });
  // newUser.id = uuidV4();
  newUser.setPassword(password);

  newUser.save((err, User) => {
    if (err) {
      return res
        .status(400)
        .send({ error: err, message: "User registration failed" });
    } else {
      let { hash, salt, ...user } = User.toJSON();
      user.accessToken = generateJWt(user._id);
      return res
        .status(201)
        .send({ message: "User registered successfully", user });
    }
  });
};
