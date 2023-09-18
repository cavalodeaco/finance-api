const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/record.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();

route.post(
  "/:type",
  rescue(requestMiddleware),
  rescue(controller.post)
);

route.get(
  "/:type/:year",
  rescue(requestMiddleware),
  rescue(controller.get)
);

route.get(
  "/all",
  rescue(requestMiddleware),
  rescue(controller.all))

module.exports = { route };
