const express = require("express");
const rescue = require("express-rescue");
const controller = require("../controllers/record.js");
const requestMiddleware = require("../middleware/request-middleware.js");

/**
 * @openapi
 * components:
 *  schemas:
 *    Record:
 *      type: object
 *      required:
 *       - amount
 *       - description
 *       - type_pay
 *       - category
 *       - source_pay
 *      properties:
 *        amount:
 *          type: number
 *          description: Amount of the finance record
 *        "description":
 *          type: string
 *          description: Description of the finance record
 *        type_pay:
 *          type: string
 *          description: Type of finance record like money, credit card, debit card, etc.
 *        source_pay:
 *          type: string
 *          description: Type of source like money, card 1, card 2, etc.
 *        category:
 *          type: string
 *          description: Category of the finance record like home, school, vehicle, etc.
 *        due_date:
 *          type: date
 *          description: Due date to finance record. Required to finance record of type output.
 *        in_date:
 *          type: date
 *          description: Input date of finance record. Required to finance record of type input.
 */

const route = express.Router();

/**
 * @openapi
 * tags:
 *  name: Record
 *  description: Records of finance
 *
 * '/record/:type':
 *   post:
 *     summary: "Create a new finance record of type like input, output, status."
 *     tags: [Record]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *       responses:
 *         200:
 *           description: The created finance record.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Record'
 *         400:
 *           description: Bad request
 *         500:
 *           description: Some server error
 */
route.post("/:type", rescue(requestMiddleware), rescue(controller.post));

/**
 * @openapi
 *
 * '/record/:type/:year':
 *  get:
 *    summary: Get list of finance records based on partition key like type + year.
 *    tags: [Record]
 *    parameters:
 *      - type: finance record type
 *        in: path
 *        description: Finance record used to construct partition key
 *       required: true
 *      - year: year
 *        in: path
 *        description: Current or selected year of interest to evaluate finance records.
 *       required: true
 *     responses:
 *       200:
 *         description: List of finance records from partition key.'
 *         content:
 *           application/json:
 *            schema:
 *             $ref: '#/components/schemas/ListRecords'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
route.get("/:type/:year", rescue(requestMiddleware), rescue(controller.get));

route.get("/all", rescue(requestMiddleware), rescue(controller.all));

module.exports = { route };
