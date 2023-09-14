const express = require("express");
const webpush = require("web-push");
const notificationRoute = require("./routes/notification.routes");
const dbConnect = require("./config/dbconnect");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
  })
);

app.use(express.json());

app.use("/notifications", notificationRoute);

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
