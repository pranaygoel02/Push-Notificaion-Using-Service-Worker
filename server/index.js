const express = require("express");
const notificationRoute = require("./routes/notification.routes");
const cors = require("cors");
const dbConnect = require("./config/dbconnect");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.send("Welcome to Push Notification Server");
});

app.use("/notifications", notificationRoute);

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
