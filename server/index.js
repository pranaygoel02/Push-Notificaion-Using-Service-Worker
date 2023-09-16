const express = require("express");
const notificationRoute = require("./routes/notification.routes");
const fcmRoutes = require("./routes/fms.routes");
const twilioRoutes = require("./routes/twilio.route");
const cors = require("cors");
const dbConnect = require("./config/dbconnect");
require("dotenv").config();

const { initializeApp, applicationDefault } = require('firebase-admin/app');

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp(
    {
        credential: applicationDefault(),
        projectId: "notification-demo-e9fb0",
    }
);

const app = express();
app.use(cors());
app.use(
    cors({
      origin: "*",
    })
  );
  
  app.use(
    cors({
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.send("Welcome to Push Notification Server");
});

app.use("/notifications", notificationRoute);
app.use("/fcm", fcmRoutes)
app.use("/twilio", twilioRoutes);

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
