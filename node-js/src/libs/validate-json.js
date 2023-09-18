const Ajv = require("ajv");
const CreateError = require("http-errors");

const validateJson = (data, schema) => {
  console.info("validateJson");
  // Validade main structure
  const ajv = new Ajv({ allErrors: true });
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.log(ajv.errors);
    throw CreateError[400](JSON.stringify(ajv.errors));
  }
};

module.exports = validateJson;
