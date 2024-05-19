const { verifyAuth } = require("../controller/CreateUser");
const { verifyUser } = require("../controller/CreateUser");

const express = require("express");

const verifyAuthRoute = express.Router();

verifyAuthRoute.get("/",verifyUser, verifyAuth);

module.exports = verifyAuthRoute;
