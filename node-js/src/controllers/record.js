const Service = require("../service/record.js");
const CreateError = require("http-errors");

const Controller = {
  get: async (req, res, next) => {
    console.info("Record controller:: GET");
    try {
      return res.status(200).json({ message: "success" });
    } catch (err) {
      throw CreateError[500]({
        message: "Error to get: " + JSON.stringify(err),
      });
    }
  },
  post: async (req, res, next) => {
    console.info("Record controller:: POST");

    const service = new Service();

    if (req.body.type == "output") { // create output record
      const resp = await service.create_output(req.body);
      return res.status(200).json({ message: resp})
    }

    return res.status(500).json({ message: "fail post" });
  },
};

module.exports = Controller;
