const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/api/app.js");

// Create table if not exists
const { dynamoDbClient } = require("./src/libs/ddb-client.js");
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const paramsRecord = {
  TableName: `${process.env.TABLE_NAME}-record`,

  AttributeDefinitions: [
    // {
    //   AttributeName: "total",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "description",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "epoc",
    //   AttributeType: "N",
    // },
    // {
    //   AttributeName: "source",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "type",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "category",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "status",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "created_by",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "created_at",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "updated_at",
    //   AttributeType: "S",
    // },
    // {
    //   AttributeName: "updated_by",
    //   AttributeType: "S",
    // },
    {
      AttributeName: "type_yyyy",
      AttributeType: "S",
    },
    {
      AttributeName: "yyyymmepoc",
      AttributeType: "N",
    },
  ],
  KeySchema: [
    {
      AttributeName: "type_yyyy",
      KeyType: "HASH",
    },
    {
      AttributeName: "yyyymmepoc",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: "1",
    WriteCapacityUnits: "1",
  },
};
dynamoDbClient
  .send(new CreateTableCommand(paramsRecord))
  .then((data) => {
    console.info(`Table record Created `, data);
  })
  .catch((err) => {
    if (err.name === "ResourceInUseException") {
      console.info(`Table record already exists `);
    } else {
      throw err;
    }
  });


app.listen(3001, () => {
  console.info("I hear you, on http://localhost:3001");
});
