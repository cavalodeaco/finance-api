const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// const { loginRoutes } = require("../routers/login.js");
const { route } = require("../routers/list.js");
const errorMiddleware = require("../middleware/error-middleware.js");
const corsMiddleware = require("../middleware/cors-middleware.js");

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
// app.use("/login", loginRoutes);
app.use("/list", route);
app.use(errorMiddleware);

module.exports = app;
