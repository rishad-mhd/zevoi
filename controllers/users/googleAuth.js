const express = require("express");
const verifyGoogleToken = require("../../lib/verifyGoogleToken");
const { Users } = require("../../models/Users");
// const { v4: uuidV4 } = require("uuid");

/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  let { credential } = req.body;

  if (credential) {
    const { error, payload: profile } = await verifyGoogleToken(credential);

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (profile) {
      // let id = uuidV4();
      let user = await Users.updateOne(
        { email: profile.email },
        { $set: { ...profile } },
        { upsert: true }
      );
      if (user) {
        res.send({ user });
      } else {
        res.status(400).send({ message: "Google authentication failed" });
      }
    }
  } else {
    res.status(401).send({ message: "Google credential required" });
  }
};
