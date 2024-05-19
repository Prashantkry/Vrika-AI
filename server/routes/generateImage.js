const { ImageGenerate } = require("../controller/generateImage");

const express = require("express");

const ImageRouter = express.Router();

ImageRouter.post("/", ImageGenerate);

module.exports = ImageRouter;
