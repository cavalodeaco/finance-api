const app = require("./api/app.js");
const serverless = require("serverless-http");
const swaggerDocs = require("./utils/swagger.js");

module.exports.handler = () => {
    serverless(app);
    swaggerDocs(app);
};