const express = require("express");
const { Users } = require("../../models/Users");
const {v4:uuidV4} =require('uuid')
/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  let userData = req.body.userData;
  let user = await Users.findOne({ email: userData.email });
  if (user) {
    return res.status(403).send({ message: "User already exist" });
  }

  let newUser = new Users(userData);
  newUser.id=uuidV4()
  newUser.setPassword(userData.password);

  newUser.save((err, User) => {
    if (err) {
      return res
        .status(400)
        .send({ error: e, message: "User registration failed" });
    } else {
      let { hash, salt, ...user } = User.toJSON();
      return res
        .status(201)
        .send({ message: "User registered successfully", user });
    }
  });
};
