const Service = require("../service/login.js");
const CreateError = require("http-errors");

const Controller = {
  do: async (req, res, next) => {
    console.info("LoginController.doLogin");
    try {
      if (process.env.ENV === "local") {
        console.info("response: ", 200, JSON.parse(process.env.TOKENS));
        return res
          .status(200)
          .json({ message: JSON.parse(process.env.TOKENS) });
      }
      const service = new Service();
      const data = await service.getToken(req.body);
      if (!data.access_token || !data.id_token || !data.refresh_token) {
        throw CreateError[500]({ message: "No token found}" });
      }

      console.info("response: ", 200, data);
      return res.status(200).json({ message: data });
    } catch (err) {
      throw CreateError[500]({
        message: "Error to login: " + JSON.stringify(err),
      });
    }
  },
};

module.exports = Controller;
