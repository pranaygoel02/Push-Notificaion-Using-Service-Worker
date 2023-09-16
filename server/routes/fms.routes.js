const express = require("express");
const FMSToken = require("../models/fmsToken");
const router = express.Router();

const { getMessaging } = require("firebase-admin/messaging");

router.post("/subscribe", async (req, res) => {
  const { token } = req.body;
  try {
    const fmsToken = new FMSToken({ token });
    console.log(fmsToken);
    await fmsToken.save();
    
    const message = {
      notification: {
        title: "Welcome To Push Notification",
        body: "This is a Test Notification",
      },
      token: token,
    };
    return getMessaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
          message: "Successfully sent message",
          token: token,
        });
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

const message = {
  notification: {
    title: "Alert",
    body: "This is a Test Notification",
    // image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
  },
  "android":{
    "priority":"high"
  },
  "apns":{
    "headers":{
      "apns-priority":"5"
    }
  },
  "webpush": {
    "headers": {
      "Urgency": "high"
    },
    "notification": {
      "requireInteraction": "true",
      "icon": "https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-red-11.png",
      "badge": "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png",
      "image": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "vibrate": [200, 100, 200],
      "click_action": "https://www.google.com/"
    }
  }
};


router.post("/send", async (req, res) => {
  const receivedToken = req.body.fcmToken;
  console.log(receivedToken);
  const messageSend = {
    ...message,
    token: receivedToken
  }
  return getMessaging()
    .send(messageSend)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

router.post("/send-all", async (req, res) => {
  const fcmTokens = await FMSToken.find({}, { token: 1 });
  const tokens = fcmTokens.map((token) => token.token);
  const messageSend = {
    ...message,
    tokens: tokens
  }
  return getMessaging()
    .sendEachForMulticast(messageSend)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

module.exports = router;
