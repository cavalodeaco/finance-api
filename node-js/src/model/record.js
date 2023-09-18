const { dynamoDbDoc } = require("../libs/ddb-doc.js");
const {
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const CreateError = require("http-errors");
const validateJson = require("../libs/validate-json.js");

const RecordOutputSchema = {
  type: "object",
  properties: {
    amount: { type: "number" },
    description: { type: "string" },
    type_pay: { type: "string" },
    source_pay: { type: "string" },
    category: { type: "string" },
    due_date: { type: "integer" },
    status: { type: "string" },
    type_yyyy: { type: "string" },
    yyyymmepoc: { type: "integer" },
    created_at: { type: "number" },
    // created_by: { type: "string" },
  },
  required: [
    "amount",
    "description",
    "type_pay",
    "source_pay",
    "category",
    "due_date",
    "type_yyyy",
    "yyyymmepoc",
    "created_at",
    // "created_by"
  ],
  additionalProperties: true,
};

class Model {
  async save(data) {
    console.info("Record model :: SAVE");

    // Validate Class
    validateJson(data, RecordOutputSchema);

    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Item: {
        type_yyyy: data.type_yyyy,
        yyyymmepoc: data.yyyymmepoc,
        created_at: data.created_at,
        // "created_by": data.created_by,
        amount: data.amount,
        description: data.description,
        due_date: data.due_date,
        source_pay: data.source_pay,
        type_pay: data.type_pay,
        category: data.category,
        status: data.status | "nao_pago",
      },
    };
    if (process.env.ENV !== "production") console.info("Creating new output record!");
    await dynamoDbDoc.send(new PutCommand(params));
    return "created";
  }
}

module.exports = { Model };
