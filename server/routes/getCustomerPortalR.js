const { getCustomerPortal } = require("../controller/customerPortal");
const express = require("express");

const getCustomerPortalR = express.Router();

getCustomerPortalR.post("/", getCustomerPortal);

module.exports = getCustomerPortalR;
