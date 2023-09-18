const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/record.js");
const requestMiddleware = require("../middleware/request-middleware.js");

const route = express.Router();

/**
 * @openapi
 * /type:
 *  post:
 *   tag:
 *     - record_create
 *     description: Create a new record based on :type
 *     responses:
 *       200:
 *         description: :type record create successfully
 *       500:
 *         description: internal errror
 *       400:
 *         description: bad request
 *
 */
route.post("/:type", rescue(requestMiddleware), rescue(controller.post));

route.delete("/:pk/:sk", rescue(requestMiddleware), rescue(controller.delete));

route.get("/:type/:year", rescue(requestMiddleware), rescue(controller.get));

route.get("/all", rescue(requestMiddleware), rescue(controller.all));

module.exports = { route };
