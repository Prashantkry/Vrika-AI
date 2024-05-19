const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    product: String,
    status: Boolean,
    purchaseDate:String,
    expiryDate: String,
    token: Number,
    amount: Number,
  },
  { _id: false }
);
const SignUpSchema = new mongoose.Schema({
    UserId: String,
    googleId: String,
    email: String,
    phone: Number,
    name: String,
    password: String,
    jwtToken: String,
    jwtRefreshToken: String,
    Image: String,
    Subscription: SubscriptionSchema,
  },
  (timestamp = true),
  (versionKey = false)
);

module.exports = new mongoose.model("UserDetails", SignUpSchema);
