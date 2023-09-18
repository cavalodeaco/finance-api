const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/record.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();

route.post(
  "/",
  rescue(requestMiddleware),
  rescue(controller.post)
);

route.get(
  "/all",
  rescue(requestMiddleware),
  rescue(controller.get_all)
);

module.exports = { route };
