const express = require("express");
const { Users } = require("../../models/Users");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  let userId = req.params.id;
  let user = await Users.findOne({ id: userId }, { hash: 0, salt: 0 });
  if (user) {
    res.send({ user });
  } else {
    res.status(400).send({ message: "User not found" });
  }
};
