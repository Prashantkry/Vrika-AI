require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoUrl = process.env.MONGO_URL;
const CEREBIUMM_URL = process.env.CEREBIUMM_URL;
const CEREBIUMM_Auth = process.env.CEREBIUMM_Auth;

const ImageGenerate = async (req, res) => {
  console.log("triggered");
  const body = req.body.backendContent;
  // console.log("body => ",body)
  let textContent = body.textContent,
    nTextContent = body.nTextContent,
    seed = body.seed,
    guidance_scale = body.guidance_scale,
    num_outputs = body.num_outputs,
    controlnet_conditioning_scale = body.controlnet_conditioning_scale;
  let userId = body.UserID_;

  try {
    const data = await fetch(CEREBIUMM_URL, {
      // const data = await fetch('', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: CEREBIUMM_Auth,
      },
      body: JSON.stringify({
        item: {
          prompt: textContent,
          num_inference_steps: 30,
          width: 1024,
          height: 1024,
          negative_prompt: nTextContent,
          num_outputs: num_outputs,
          guidance_scale: guidance_scale,
          seed: seed,

          // refine: "base_image_refiner",
          // scheduler: "KarrasDPM",
          // refine_steps: 20,
          // sizing_strategy: "width_height",

          // apply_watermark: false,
          // // not  in use below 
          // // controlnet_1: "none",
          // // controlnet_1_start: 0,
          // // controlnet_1_end: 1,
          // // controlnet_1_conditioning_scale: controlnet_conditioning_scale || 0.8,
        }
      }),
    });
    const result = await data.json();
    // console.log("result => ", result);
    const generatedImageData = result.result
    return res.status(200).json({
      message: "Generated Image",
      generatedImageData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { ImageGenerate };
