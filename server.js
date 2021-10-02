const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./routes/userRoute");
const {
  protect,
  admin,
  protectLoginAndRegister,
  moderator,
} = require("./middleware/auth");
const { logout } = require("./routes/logout");
const { getAll } = require("./routes/getAll");
const { getUser, updateUser } = require("./routes/updateUser");
const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use("/api/users", protectLoginAndRegister, users);
app.get("/logout", protect, logout);
app.get("/getAll", protect, moderator, getAll);
app.get("/getUser/:id", getUser);
app.put("/updateuser/:id", protect, admin, updateUser);

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send(`Home Page`);
});

app.listen(PORT, console.log(`app is working on port ${PORT}`));
