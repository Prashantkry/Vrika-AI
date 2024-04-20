const mongoose = require("mongoose");
const SignUpSchema = new mongoose.Schema(
  {
    UserId: String,
    email: String,
    phone: Number,
    name: String,
    password: String,
    Image: String,
    googleId: String,
  },
  (timestamp = true)
);

module.exports = new mongoose.model("SignUp", SignUpSchema);
