const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

module.exports = app;
