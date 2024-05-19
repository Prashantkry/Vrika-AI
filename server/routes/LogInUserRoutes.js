const { LoginController } = require("../controller/CreateUser");

const express = require("express");

LogInUserRoute = express.Router();

LogInUserRoute.post("/", LoginController);

module.exports = LogInUserRoute;
