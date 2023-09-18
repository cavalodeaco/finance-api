const Service = require("../service/record.js");
const CreateError = require("http-errors");

const Controller = {
  get_all: async (req, res, next) => {
    console.info("Record controller:: GET ALL");
    const service = new Service();
    return res.status(200).json(await service.get_all());
  },
  post: async (req, res, next) => {
    console.info("Record controller:: POST");

    const service = new Service();

    if (req.body.type == "output") {
      // create output record
      const resp = await service.create_output(req.body);
      return res.status(200).json({ message: resp });
    }

    return res.status(500).json({ message: "fail post" });
  },
};

module.exports = Controller;
