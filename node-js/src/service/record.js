const CreateError = require("http-errors");
const validateJson = require("../libs/validate-json.js");
const { jsDateToEpoch } = require("../libs/epoc-converter.js");
const { Model: RecordModel} = require("../model/record.js");

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

class Service {
  async get_all () {
    console.info("Record service:: GET ALL");
    const model = new RecordModel();
    return await model.get_all(10); 
  }

  async create_output(data) {
    console.info("Record controller:: create output");
    let output = data;

    // validate json
    validateJson(data, CreateOutputSchema);

    // insertion EPOC
    const epoc_now = jsDateToEpoch(new Date());

    // convert due_date 2 epoc
    const due_date = new Date(output.due_date);
    const epoc_due = jsDateToEpoch(due_date);
    const year = due_date.getFullYear();
    const month = due_date.getMonth();

    // insert new fields
    output["due_date"] = epoc_due;
    output["type_yyyy"] = "output_"+year;
    output["yyyymmepoc"] = Number(`${year}${month}${epoc_now}`);
    // output["created_by"] = "";
    output["created_at"] = epoc_now;

    // Create
    const model = new RecordModel();
    return await model.save(output); // created or existed
  }
}

module.exports = Service;
