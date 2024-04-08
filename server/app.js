const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json()); // Add this line to parse JSON bodies

app.post("/api/generateImage", async (req, res) => {
  console.log("triggered");
  const { positivePrompts } = req.body; // Parse the positivePrompts from the request body
  try {
    const data = await fetch(
      "https://run.cerebrium.ai/v3/p-132491f2/vrikaaicerebriumdata/predict",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJwLTEzMjQ5MWYyIiwiaWF0IjoxNzEyMzQyMzkwLCJleHAiOjIwMjc5MTgzOTB9.lNmoyP_iwUkeGBPRd9zJ3xMJ9Ec9nNzWgRDMy3jZKjnlVsgvbDYihLtKB0673hEv7D9NiYZP5HZVUa9KQwWtyjvv59zmHMMk8Ph_IilicQfzR7P5Ywtovdz389GCEMW5PERnqsbQspPVQx3JHCUVmVkRxDaSTBGDIyEqy8cFiBHeNvDHCYzuEsCrN3rFHOB18p0CYPUklYbo3SJXLhYToKjxYOR8jz_z5LcuqdWHhX3fAW40ytbbENK7w6h55V4GBY2NkiTgqo23XKrF8ZVkj7N04-uCBXiI5PlOdeiXjGJi2WbXqWO5yl85Ejd8vy_XI1DY1MLzHcaMTWwkakcdsA",
        },
        body: JSON.stringify({
          prompt: positivePrompts,
        }),
      }
    );
    const result = await data.json();
    res.status(200).json({
      message: "Generated Image",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = app;
