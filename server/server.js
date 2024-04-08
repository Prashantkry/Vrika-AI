const http = require("http");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 1000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
