const {saveGeneratedImageData} = require("../controller/saveGeneratedImagesData")
const express = require("express")
const saveGeneratedImageDataR = express.Router()

saveGeneratedImageDataR.post("/",saveGeneratedImageData)

module.exports = saveGeneratedImageDataR