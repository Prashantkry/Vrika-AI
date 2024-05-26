const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const getAllGeneratedImages = async (req, res) => {
  console.log("triggered");
  const UserID_ = req.body;
  console.log("UserId___ -> ", UserID_.UserID);
  try {
    const client = await MongoClient.connect(mongoUrl);
    const imageCollection = await client
      .db("VrikaAI")
      .collection("GeneratedImageData");

    // check if userId exist in db
    const existUserId = await imageCollection.findOne({
      "UserId -> ": UserID_.UserID,
    });
    if (existUserId) {
      console.log("User Id already exist");
      const allImages = existUserId.Images;
      // console.log("allImages -> ", allImages);

      // get customer id
      const userCollection = client.db("VrikaAI").collection("userdetails");
      const userDatas = userCollection.findOne({
        UserId: UserID_.UserID,
      });
      const userData = await userDatas;
      // console.log("user datas =>", userData);

      const customerId = userData.Subscription.customerId;

      console.log("customerId   =>", customerId);

      return res
        .status(200)
        .json({ message: "All Images", customerId: customerId, allImages });
    }

    // if (existUserId) {

    // }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllGeneratedImages };
