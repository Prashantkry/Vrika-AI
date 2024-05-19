const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  UserId: String,
  image: [String],
});

module.exports = new mongoose.model("ImageSchema", ImageSchema);
