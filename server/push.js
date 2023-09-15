const { pushNotification } = require("./config/webpush");

pushNotification(
  {
    endpoint:
      "https://wns2-pn1p.notify.windows.com/w/?token=BQYAAAA%2fY5lOaJhBEvWeeqDnmK9c%2bNOWJns86m4tK2IdOipaGhlNghdqbXb3n3jkkzjBBIeT4bipauo6UpxFWUa5%2f3sszSKTrOYT6IGIdhyOwpN9ejRd391omJq2xswKNy7xQ%2fdvcbnvEA22LeJDD%2bGfHnf1XGRnXP%2f5rNpiDvpPA95X7MruIEGWRL68Twuw54TfM%2b1qGxXrkl9g9%2btpnZkNiJNcL45FNJAfD64fbpsAuvF647b06uobucoPXxPtyM4%2bU64nBiu6SK4wfpxHvWTajnPWYu2PvjvslpEfuBv1ZYCdbfweMxwchsNSSiPSmxDdDo8%3d",
    expirationTime: null,
    keys: {
      p256dh:
        "BFSy3FnCZ-lfxHCNqA_oeUXFdShY5IV0IH03IkphKAyodL_hXS-msgRhtDGDkalJv7FgDDNUMjuILv6YOgu3ejY",
      auth: "brdMrrFIN6doblv0RxEn7Q",
    },
  },
  JSON.stringify({ title: "Welcome", body: "Thanks for subscribing!" })
);
