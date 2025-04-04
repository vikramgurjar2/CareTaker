const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const user = require("./routes/userRoute");
const doctor = require("./routes/doctorRoute");

app.use("/api/v1", user);
app.use("/api/v1", doctor);

module.exports = app;
