const mongoose = require('mongoose');

const notificationSubscriptionSchema = new mongoose.Schema({
    endpoint: { type: String, unique: true, required: true },
  expirationTime: { type: Number, required: false },
  keys: {
    auth: String,
    p256dh: String,
  },
});

const NotificationSubscription = mongoose.model("NotificationSubscription", notificationSubscriptionSchema);

module.exports = NotificationSubscription;