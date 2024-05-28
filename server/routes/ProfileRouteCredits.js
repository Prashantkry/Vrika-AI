const { getProfileCredits } = require("../controller/ProfileCredits");

const express = require("express");

getProductCreditsRouter = express.Router();

getProductCreditsRouter.post("/", getProfileCredits);

module.exports = getProductCreditsRouter;  