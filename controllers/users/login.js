const express = require("express");
const generateJWt = require("../../lib/generateJWT");
const { Users } = require("../../models/Users");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = function (req, res, next) {
  Users.findOne({ email: req.body.email })
  .then((user) => {
    if (user) {
        if (user.validPassword(req.body.password)) {
          let { hash, salt, ...data } = user.toJSON();
          data.accessToken = generateJWt(user._id);
          return res.status(201).json({
            message: "User Logged In",
            user: data,
          });
        } else {
          return res.status(400).json({
            message: "Incorrect passord",
          });
        }
      } else {
        res.status(401).json({ message: "User doesn't exists" });
      }
    })
    .catch((e) => {
      res.status(403).json({ message: "Login failed" });
    });
};
