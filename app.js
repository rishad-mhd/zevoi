var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser")
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
var cors = require("cors");
var passport = require('passport');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
// view engine setup 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({
  origin: '*'
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(passport.initialize());
// app.use(passport.session())


async function main() {
  await mongoose
    .connect(
      "mongodb+srv://rishad:K5IrhxxVIIM5uSRl@cluster0.ypjwyxf.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("mongo connected"));
}
main().catch((err) => console.log(err));



const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ["./routes/users.js"],
};

app.use("/", indexRouter);
app.use("/users", usersRouter);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/books', (req, res) => {
  res.send([
    {
      id: 1,
      title: "Harry Potter",
    }
  ])
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
