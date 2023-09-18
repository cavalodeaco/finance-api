const app = require("./api/app.js");
const serverless = require("serverless-http");

// docs
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports.handler = serverless(app);