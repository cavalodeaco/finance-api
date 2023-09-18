const express = require("express");
const rescue = require("express-rescue");
const Controller = require("../controllers/login.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();
/**
 * @openapi
 * '/login':
 *  post:
 *   tag:
 *     - Login
 *     description: Validate login to Finance Application
 *     responses:
 *       200:
 *         description: Authentication successfully
 *       500:
 *         description: internal errror
 *       400:
 *         description: bad request
 *
 */
route.post(
  "/",
  rescue(requestMiddleware),
  rescue(Controller.post)
);

module.exports = { route };
