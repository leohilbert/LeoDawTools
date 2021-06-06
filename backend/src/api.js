const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const serverless = require("serverless-http");

const indexRouter = require("./routes/index");

const api = express();

// noinspection JSCheckFunctionSignatures
api.use(morgan("dev"));

// noinspection JSCheckFunctionSignatures
api.use(cors({}));

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

api.use("/", indexRouter);
api.use("/.netlify/functions/api", indexRouter);

api.use(function (req, res) {
  const err = createError(404);
  res.status(404).send({
    message: err.message,
    stack: err.stack,
  });
});

api.use(function (err, req, res) {
  console.log(err);
  res.status(500).send({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = api;
module.exports.handler = serverless(api);
