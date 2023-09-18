const { dynamoDbDoc } = require("../libs/ddb-doc.js");
const {
  PutCommand,
  QueryCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const CreateError = require("http-errors");
const validateJson = require("../libs/validate-json.js");
const { jsDateToEpoch } = require("../libs/epoc-converter.js");

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

const RecordInputSchema = {
  type: "object",
  properties: {
    amount: { type: "number" },
    description: { type: "string" },
    type_pay: { type: "string" },
    source_pay: { type: "string" },
    category: { type: "string" },
    in_date: { type: "integer" },
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
    "in_date",
    "status",
    "type_yyyy",
    "yyyymmepoc",
    "created_at",
    // "created_by"
  ],
  additionalProperties: true,
};
// https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
class Model {
  async save_output(data) {
    console.info("Record model :: SAVE OUTPUT");

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
    if (process.env.ENV !== "production")
      console.info("Creating new output record!");
    await dynamoDbDoc.send(new PutCommand(params));
    return "created";
  }

  async save_input(data) {
    console.info("Record model :: SAVE INPUT");

    // Validate Class
    validateJson(data, RecordInputSchema);

    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Item: {
        type_yyyy: data.type_yyyy,
        yyyymmepoc: data.yyyymmepoc,
        created_at: data.created_at,
        // "created_by": data.created_by,
        amount: data.amount,
        description: data.description,
        in_date: data.in_date,
        source_pay: data.source_pay,
        type_pay: data.type_pay,
        category: data.category,
        status: data.status | "previsto",
      },
    };
    if (process.env.ENV !== "production")
      console.info("Creating new input record!");
    const result = await dynamoDbDoc.send(new PutCommand(params));
    return result;
  }

  async get(type, year, limit, page) {
    console.info("Record model:: GET");
    const epoc_year = jsDateToEpoch(new Date(`${year}-01-01`)); // start date from year
    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Limit: parseInt(limit),
      ExclusiveStartKey: page,
      KeyConditionExpression:
        "type_yyyy = :type_yyyy AND yyyymmepoc >= :yyyymmepoc",
      ExpressionAttributeValues: {
        ":type_yyyy": `${type}_${year}`,
        ":yyyymmepoc": Number(
          `${year}01${epoc_year.toString().padStart(10, "0")}`
        ),
      },
      ConsistentRead: true,
    };
    if (page === undefined || page === 0) {
      delete params.ExclusiveStartKey;
    }
    console.log(params);
    const result = await dynamoDbDoc.send(new QueryCommand(params));
    return { Items: result.Items, page: result.LastEvaluatedKey };
  }

  async all(limit, page) {
    console.info("Record model:: ALL");
    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Limit: parseInt(limit),
      ExclusiveStartKey: page,
    };
    if (page === undefined || page === 0) {
      delete params.ExclusiveStartKey;
    }
    const result = await dynamoDbDoc.send(new ScanCommand(params));
    return { Items: result.Items, page: result.LastEvaluatedKey };
  }

  async delete(pk, sk) {
    console.info("Record model:: DELETE");
    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Key: {
        type_yyyy: pk,
        yyyymmepoc: Number(sk),
      },
    };
    const result = await dynamoDbDoc.send(new DeleteCommand(params));
    return result;
  }

  async update(pk, sk, data) {
    console.info("Record model:: UPDATE");
    const params = {
      TableName: `${process.env.TABLE_NAME}-record`,
      Key: {
        type_yyyy: pk,
        yyyymmepoc: Number(sk),
      },
      UpdateExpression:
        "SET " +
        Object.keys(data)
          .map((key) => {
            return `#${key} = :${key}`;
          })
          .join(", "),
      ExpressionAttributeNames: Object.fromEntries(
        Object.keys(data).map((key) => {
          return [`#${key}`, key];
        })
      ),
      ExpressionAttributeValues: Object.fromEntries(
        // recover as object
        Object.entries(data).map((entry) => {
          return [`:${entry[0]}`, entry[1]];
        }) // transform into tuples with :
      ),
      ReturnValues: "ALL_NEW",
    };
    const result = await dynamoDbDoc.send(new UpdateCommand(params));
    return result;
  }
}

module.exports = { Model };
