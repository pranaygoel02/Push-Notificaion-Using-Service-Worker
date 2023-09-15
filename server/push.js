const { pushNotification } = require("./config/webpush");

pushNotification(
  {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/dkjiQqeYsko:APA91bG4v43dmfy1r3TCaPVWUCwuTiKDLGKflmA2GHsbdG-e8RGTviB4yxnGMZuHO18cKnbZBuBMMdmqNxuglINZXKQgGvhdiA0xJKCPJB4WIpqozS4kBmYAcEd88fzPZ81V6jNVcL69",
    expirationTime: null,
    keys: {
      p256dh:
        "BCnQ37g5852L8kXjnS8aLWY7BlfP0LhLT3QxQH_m3RNC4p0nVCORZOBgOB7RX2FCljZcStEcovClQ69vhwJcyxI",
      auth: "epMUlbhRGctOiq3BMFSXuA",
    },
  },
  JSON.stringify({ title: "Welcome", body: "Thanks for subscribing!" })
);
