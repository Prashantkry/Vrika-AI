// API to get profile data
const UserSchema = require("../model/UserSchema.js");
const getProfileData = async (req, res) => {
  console.log("triggered");
  const { UserID } = req.body;
  console.log("UserID -> ", UserID);
  try {
    const user = await UserSchema.findOne({ UserId: UserID });
    // console.log("user -> ", user);
    if (user) {
      const userData = {
        UserName: user.name,
        Email: user.email,
        Phone: user.phone,
        pImage: user.Image,
        Subscriptions: user.Subscription,
      };
      return res.status(200).json({ message: "User Found", userData });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getProfileData };
