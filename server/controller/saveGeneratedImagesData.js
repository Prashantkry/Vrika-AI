const { MongoClient } = require("mongodb");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const saveGeneratedImageData = async (req, res) => {
  console.log("trug save image ");
  const { imageArrayData, backendContent } = req.body;
  console.log("image -> ", imageArrayData, "backendContent => ", backendContent);

  const imageGeneratedInfo = {
    prompt:backendContent.textContent,
    negative_prompt:backendContent.nTextContent,
    seed:backendContent.seed,
    refine_steps: 20,
    guidance_scale:backendContent.guidance_scale,
    num_inference_steps: 30,
    controlnet_1: "none",
    controlnet_1_start: 0,
    controlnet_1_end: 1,
    controlnet_1_conditioning_scale:backendContent.controlnet_conditioning_scale,
  };

  const client = MongoClient.connect(MONGO_URL);
  const imageCollection = (await client)
    .db("VrikaAI")
    .collection("GeneratedImageData");

  // find user id in collections
  const findQuery = backendContent.UserID_;
//   console.log("findQuery => ", findQuery);
  const foundData = await imageCollection.findOne({ "UserId -> ": findQuery });
//   console.log("foundData -> ", foundData);

  //   insert image data to userId
  if (foundData) {
    const updatedData = imageCollection.updateOne(
      { "UserId -> ": backendContent.UserID_ },
      {
        $push: {
          Images: {
            imagesData:imageArrayData,
            generationImageData: imageGeneratedInfo,
          },
        },
      }
    );
    console.log("updatedData -> ", await updatedData);
  }
};

module.exports = { saveGeneratedImageData };
