const webpush = require("web-push");

const vapidKeys = 
{
  publicKey: "BL5K8kB_kgzknNBjNvOkd1-ISoroCbkUdfaUPtAcLShuGJz9IUmtmIx0vmWhxHEb9FnnCQVpelarjX8KpYoUndo",
  privateKey: "fbwx1OfWIR_GAQ7T4yFiuGKJL_mm05q2zyOdcrMuqP8",
};

const pushNotification = () => {
  webpush.setVapidDetails(
      'mailto:test@test.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
}

module.exports = pushNotification;