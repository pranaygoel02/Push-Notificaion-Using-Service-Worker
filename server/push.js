const { pushNotification } = require("./config/webpush");

pushNotification(
  {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/enfcicpRlR8:APA91bFzLfhgvNlUlb-PrjiTNjGMGMCXLbVuQ7qs9B2p-NRDdI6ul0yN9wA7ZWK5Y2ent9y0OSLB8krEEcvHzW3woQ6OcVcfcanrXHQ9qRONNJyY1MieAwyS3HVdZMbabkvlbYVqnin4",
    expirationTime: null,
    keys: {
      p256dh:
        "BO97S597wyvstCcmMnwJ2Wo3SbM34tFACHK1cvfLKuuzWlU5fCc5Z_mk66KkC3fkZ4fvgSj1cHTrK3---SC573Y",
      auth: "g9kGgfHb2thc56qWPQR4Sw",
    },
  },
  JSON.stringify({ title: "Welcome", body: "Thanks for subscribing!" })
);
