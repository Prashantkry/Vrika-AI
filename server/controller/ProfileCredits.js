// API to get profile data
const UserSchema = require("../model/UserSchema.js");
const getProfileCredits = async (req, res) => {
  // console.log("triggered");
  const {userId}  = req.body
  let Credits
  try {
    const user = await UserSchema.findOne({ UserId: userId });
    if (user) {
      Credits = await user.Subscription.token
    }
    return res.status(200).json({ message: "User Found", "Credits":Credits });
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getProfileCredits };
