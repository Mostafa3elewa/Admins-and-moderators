const express = require("express");
const app = express();

const PORT = 5000;
app.get("/", (req, res) => {
  res.send(`API is running on port ${PORT}`);
});

app.listen(PORT, console.log(`app is working on port ${PORT}`));
