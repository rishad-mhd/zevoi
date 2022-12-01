var express = require("express");
const { Users } = require("../models/Users");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          res.send({ user, staus: 1 });
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
});

router.post("/register", function (req, res, next) {
  Users.create(req.body.userData)
    .then((response) => {
      res.send({ message: "User registered successfully" });
    })
    .catch((e) => {
      res.send({ error: e, message: "User registration failed" });
    });
});

module.exports = router;
