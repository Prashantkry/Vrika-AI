const { getProfileData } = require("../controller/ProfileData.js");

const express = require("express");

getProductRouter = express.Router();

getProductRouter.post("/", getProfileData);

module.exports = getProductRouter;  