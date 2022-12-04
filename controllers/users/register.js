const express = require('express');
const { Users } = require('../../models/Users');

/**
 * 
 * @param {express.request} req 
 * @param {express.response } res 
 * @param {express.NextFunction} next 
 */
module.exports = async function (req, res, next) {
    let userData = req.body.userData
    let user = await Users.findOne({ email: userData.email })
    if (user) {
        res.status(403).send({ message: 'User already exist' })
    }
    await Users.create(userData)
        .then((response) => {
            res.send({ message: "User registered successfully",user:response });
        })
        .catch((e) => {
            res.send({ error: e, message: "User registration failed" });
        });
}