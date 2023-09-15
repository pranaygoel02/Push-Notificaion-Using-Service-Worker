const express = require('express');
const FMSToken = require('../models/fmsToken');
const router = express.Router();

const {getMessaging} = require('firebase-admin/messaging');


router.post("/subscribe", async (req, res) => {
    const {token} = req.body;
    try {
        const fmsToken = new FMSToken({token});
        await fmsToken.save();
        res.status(201).json({
            message: "Token saved successfully!",
        });
    }
    catch (err) {
        res.status(500).json({error: err});
    }
});

router.post("/send", async (req,res) => {
    const receivedToken = req.body.fcmToken;
  console.log(receivedToken);
  const message = {
    notification: {
      title: "Alert",
      body: 'This is a Test Notification'
    },
    token: receivedToken,
  };
  
  getMessaging()
    .send(message)
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

module.exports = router;