const createError = require("http-errors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// noinspection JSCheckFunctionSignatures
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
