const mongoose = require('mongoose');

const twilioSchema = new mongoose.Schema({
    phone: { type: String, unique: true, required: true },
});

const Twilio = mongoose.model("Twilio", twilioSchema);

module.exports = Twilio;