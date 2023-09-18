const CreateError = require("http-errors");
const validateJson = require("../libs/validate-json.js");
const { jsDateToEpoch } = require("../libs/epoc-converter.js");
const { Model: RecordModel } = require("../model/record.js");

const CreateOutputSchema = {
  type: "object",
  properties: {
    amount: { type: "number" },
    description: { type: "string" },
    type_pay: { type: "string" },
    source_pay: { type: "string" },
    category: { type: "string" },
    due_date: { type: "string" },
    status: { type: "string" },
  },
  required: [
    "amount",
    "description",
    "type_pay",
    "source_pay",
    "category",
    "due_date",
  ],
  additionalProperties: true,
};

const CreateInputSchema = {
  type: "object",
  properties: {
    amount: { type: "number" },
    description: { type: "string" },
    type_pay: { type: "string" },
    source_pay: { type: "string" },
    category: { type: "string" },
    in_date: { type: "string" },
    status: { type: "string" },
  },
  required: [
    "amount",
    "description",
    "type_pay",
    "source_pay",
    "category",
    "in_date",
    "status",
  ],
  additionalProperties: true,
};

class Service {
  async all() {
    console.info("Record service:: ALL");
    const model = new RecordModel();
    return await model.all(100);
  }

  async get(type, year, limit) {
    console.info("Record service:: GET");
    const model = new RecordModel();
    return await model.get(type, year, 100);
  }

  async create_input(data) {
    console.info("Record controller:: create input");

    // validate json
    validateJson(data, CreateInputSchema);

    // process keys
    const input = this.process_keys(data, "in_date", "input");

    // Create
    const model = new RecordModel();
    return await model.save_input(input); // created or existed
  }

  async create_output(data) {
    console.info("Record controller:: create output");

    // validate json
    validateJson(data, CreateOutputSchema);

    // process keys
    const output = this.process_keys(data, "due_date", "output");

    // Create
    const model = new RecordModel();
    return await model.save_ouput(output); // created or existed
  }

  process_keys(json, colum_date, type) {
    // insertion EPOC
    const epoc_now = jsDateToEpoch(new Date());

    // convert due_date 2 epoc
    const date = new Date(json[colum_date]);
    const epoc_date = jsDateToEpoch(date);
    const year = date.getFullYear();
    const month = date.getMonth();

    // insert new fields
    json[colum_date] = epoc_date; // store date as epoc
    json["type_yyyy"] = `${type}_${year}`;
    json["yyyymmepoc"] = Number(
      `${year}${month.toString().padStart(2, "0")}${epoc_now
        .toString()
        .padStart(10, "0")}`
    );
    // output["created_by"] = "";
    json["created_at"] = epoc_now;

    return json;
  }
}

module.exports = Service;
