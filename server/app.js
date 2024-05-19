const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


const versionRoute = require("./routes/VersionRoute");

// app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1", versionRoute);

app.get("/", (req, res) => {
  res.send("Backend Server");
});

module.exports = app;


/*

curl -X POST https://run.cerebrium.ai/v3/p-132491f2/vrikaaicerebriumdata/predict \
     -H 'Content-Type: application/json'\
     -H 'Authorization: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJwLTEzMjQ5MWYyIiwiaWF0IjoxNzEyMzQyMzkwLCJleHAiOjIwMjc5MTgzOTB9.lNmoyP_iwUkeGBPRd9zJ3xMJ9Ec9nNzWgRDMy3jZKjnlVsgvbDYihLtKB0673hEv7D9NiYZP5HZVUa9KQwWtyjvv59zmHMMk8Ph_IilicQfzR7P5Ywtovdz389GCEMW5PERnqsbQspPVQx3JHCUVmVkRxDaSTBGDIyEqy8cFiBHeNvDHCYzuEsCrN3rFHOB18p0CYPUklYbo3SJXLhYToKjxYOR8jz_z5LcuqdWHhX3fAW40ytbbENK7w6h55V4GBY2NkiTgqo23XKrF8ZVkj7N04-uCBXiI5PlOdeiXjGJi2WbXqWO5yl85Ejd8vy_XI1DY1MLzHcaMTWwkakcdsA'\
     --data '{"prompt": "Hello World!"}'

*/