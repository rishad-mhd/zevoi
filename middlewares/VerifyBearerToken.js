const express = require("express");
const verifyJWT = require("../lib/verifyJWT");
const { Users } = require("../models/Users");
/**
 *
 * @param {express.request} req
 * @param {express.response } res
 * @param {express.NextFunction} next
 */
module.exports = (req, res, next) => {
  let path = req.path;
  let bearerHeader = req.headers.authorization;
  let guestAccessibleURL = ["/api/users/login", "/api/users/register","/api/users/forgot-password"];
  if (guestAccessibleURL.includes(path)) {
    return next();
  }
  if (!bearerHeader) {
    return res.status(401).json({ message: "Authentication error" });
  }
  let bearerToken = bearerHeader.split(" ")[1];
  verifyJWT(bearerToken, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Authentication error" });
    }
    let user = await Users.findOne({ _id: data._id, status: 1 });
    if (!user) return res.status(401).json({ message: "Authentication error" });
    next();
  });
};
