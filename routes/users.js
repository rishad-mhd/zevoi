var express = require("express");
const forgotPassword = require("../controllers/users/forgotPassword");
const getById = require("../controllers/users/getById");
const googleAuth = require("../controllers/users/googleAuth");
const login = require("../controllers/users/login");
const register = require("../controllers/users/register");
var router = express.Router();

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Api endpoint for user login.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User data for login.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 */
router.post("/login", login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Api endpoint for create user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             userData:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 username:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 place:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *                 - username
 */
router.post("/register", register);

/**
 * @swagger
 * /users/get-by-id/:id:
 *   get:
 *     summary: Get user data by user id.
 *     parameters:
 *       - in: params
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: string
 *
 */
router.get("/get-by-id/:id", getById);


router.post("/auth/google", googleAuth);


router.post("/forgot-password", forgotPassword);

module.exports = router;
