const express = require("express");
const { version } = require("../../package.json");
const swaggerAutogen = require('swagger-autogen');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RESP API - Finance Rancheiros",
      version,
    },
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
  apis: ['../api/app.js', '../routers/record.js']
};

const outputFile = '../../swagger-output.json';
const endpointsFiles = ['../../index.js'];

swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
    require('../../index')           // Your project's root file
});