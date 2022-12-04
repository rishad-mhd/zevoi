const express = require("express");
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
          return res.status(201).send({
            message: "User Logged In",
            user: data,
          });
        } else {
          return res.status(400).send({
            message: "Incorrect passord",
          });
        }
      } else {
        res.status(401).send({ message: "User doesn't exists" });
      }
    })
    .catch((e) => {
      res.status(403).send({ message: "Login failed" });
    });
};
