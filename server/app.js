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
    // origin: "https://vrikaai.netlify.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1", versionRoute);

app.get("/", (req, res) => {
  res.send("Backend Server");
});

module.exports = app;