const Service = require("../service/login.js");
const CreateError = require("http-errors");

const Controller = {
  do: async (req, res, next) => {
    console.info("List controller:: Do");
    try {
      return res.status(200).json({ message: "success" });
    } catch (err) {
      throw CreateError[500]({
        message: "Error to login: " + JSON.stringify(err),
      });
    }
  },
};

module.exports = Controller;
