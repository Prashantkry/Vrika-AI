const { getAllGeneratedImages } = require("../controller/getImageUserDatabase");
const express = require("express");

const GetAllGeneratedImagesRouter = express.Router();

GetAllGeneratedImagesRouter.post("/", getAllGeneratedImages);

module.exports = GetAllGeneratedImagesRouter;