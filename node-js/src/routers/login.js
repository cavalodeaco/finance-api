const express = require("express");
const rescue = require("express-rescue");
const Controller = require("../controllers/login.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();

route.post(
  "/",
  rescue(requestMiddleware),
  rescue(Controller.post)
);

module.exports = { route };
