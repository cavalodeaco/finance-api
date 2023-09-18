const Service = require("../service/record.js");
const CreateError = require("http-errors");

const Controller = {
  all: async (req, res, next) => {
    console.info("Record controller:: ALL");

    if (process.env.ENV == "local") {
      const service = new Service();
      const resp = await service.all();
      return res.status(200).json({ message: "success", data: resp });
    }
    return res.status(500).json({ message: "fail all" });
  },
  get: async (req, res, next) => {
    console.info("Record controller:: GET");

    const type = req.params.type;
    const year = req.params.year;
    const service = new Service();
    const resp = await service.get(type, year);
    return res.status(200).json({ message: "success", data: resp });
  },
  post: async (req, res, next) => {
    console.info("Record controller:: POST");
    const type = req.params.type;
    const service = new Service();

    if (type == "output") {
      // create output record
      const resp = await service.create_output(req.body);
      return res.status(200).json({ message: "success", data: resp });
    } else if (type == "input") {
      // create output record
      const resp = await service.create_input(req.body);
      return res.status(200).json({ message: "success", data: resp });
    }

    return res.status(500).json({ message: "fail post" });
  },
  delete: async (req, res, next) => {
    console.info("Record controller:: DELETE");
    const pk = req.params.pk;
    const sk = req.params.sk;
    const service = new Service();
    const resp = await service.delete(pk, sk);
    return res.status(200).json({ message: "success", data: resp });
  }
};

module.exports = Controller;
