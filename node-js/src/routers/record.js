const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/record.js");
const requestMiddleware = require("../middleware/request-middleware.js");

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - type_pay
 *         - category
 *         - source_pay
 *       properties:
 *         amount:
 *           type: number
 *           description: Amount of the finance record
 *       example:
 *         amount: 10.00
 */

const route = express.Router();

/**
 * @openapi
 * tags:
 *  name: Record
 *  description: Records of finance
 *
 * /record/:type:
 *  post:
 *   summary: Create a new record
 *   tags: [Record]
 *   requestBody:
 *      required: true
 *      content:
 *          application/json
 *
 */
route.post("/:type", rescue(requestMiddleware), rescue(controller.post));

route.delete("/:pk/:sk", rescue(requestMiddleware), rescue(controller.delete));

route.get("/:type/:year", rescue(requestMiddleware), rescue(controller.get));

route.get("/all", rescue(requestMiddleware), rescue(controller.all));

module.exports = { route };
