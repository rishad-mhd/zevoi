const express = require('express');
const { Users } = require('../../models/Users');

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
                if (user.password === req.body.password) {
                    let { password, ...other } = user
                    res.send({ user: other, staus: 1 });
                } else {
                    res.status(401).send({ message: "Incorrect passord" });
                }
            } else {
                res.status(401).send({ message: "User doesn't exists" });
            }
        })
        .catch((e) => {
            res.status(403).send({ message: "Login failed" });
        });
}