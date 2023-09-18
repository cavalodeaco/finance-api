const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { route: login } = require("../routers/login.js");
const { route: record } = require("../routers/record.js");
// const errorMiddleware = require("../middleware/error-middleware.js");
const corsMiddleware = require("../middleware/cors-middleware.js");

const app = express();
app.use(bodyParser.json());
// app.use(corsMiddleware);
app.use("/login", login);
app.use("/record", record);
// app.use(errorMiddleware);

module.exports = app;
