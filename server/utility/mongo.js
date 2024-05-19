const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

// when connection is successful
mongoose.connection.once("open", () => {
  console.log("MongoDB connection successful");
});

// when connection is unsuccessful
mongoose.connection.on("error", () => {
  console.log("MongoDB connection failed");
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
