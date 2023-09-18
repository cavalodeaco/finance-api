const { version } = require("./package.json");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RESP API - Finance Rancheiros",
      version,
      contact: {
        name: "Cavalo de Aço Sistemas",
      },
    },
    schemes: ["https"],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routers/record.js"],
};

const swaggerJsdoc = require("swagger-jsdoc");
const specs = swaggerJsdoc(options);

var fs = require('fs');
fs.writeFile("../swagger.json", JSON.stringify(specs), function(err) {
    if (err) {
        console.log(err);
    }
});

// const swaggerUi = require("swagger-ui-express");
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));