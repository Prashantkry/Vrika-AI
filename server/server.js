const http = require("http");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 1000;
const { mongoConnect } = require("./utility/mongo");

const logger = require("./logger");

mongoConnect()
  .then(() => {
    http.createServer(app).listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
