const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./routes/userRoute");
const app = express();
dotenv.config();
connectDB();

app.use("/api/users", users);


const PORT = 5000;
app.get("/", (req, res) => {
  res.send(`API is running on port ${PORT}`);
});

app.listen(PORT, console.log(`app is working on port ${PORT}`));
