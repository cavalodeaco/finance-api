const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/list.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();

route.get(
  "/",
  rescue(requestMiddleware),
  rescue(controller.do)
);

module.exports = { route };
