const express = require("express");
const Twilio = require("../models/twilio");
const router = express.Router();
const twilio = require("twilio");

require("dotenv").config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/subscribe", async (req, res) => {
  const { phone, name } = req.body;
  try {
    const validation_request = await client.validationRequests.create({
        friendlyName: name,
        phoneNumber: "+91" + phone,
    });
    console.log(validation_request);
    const user = new Twilio({ phone });
    await user.save();
    res.status(201).json({
      message: "Ph. no. saved successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});


router.post("/send", async (req, res) => {
  const { phone, message } = req.body;
  console.log(phone, message);
  try {
    const findPhoneNumberInDB = await Twilio.findOne({ phone });
    if (!findPhoneNumberInDB) {
      throw new Error("Phone number not found in DB");
    }
    const messageCreate = await client.messages
      .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+91" + phone,
      })

    console.log(messageCreate);

    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
