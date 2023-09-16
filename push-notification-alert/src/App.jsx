import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  registerServiceWorker,
  checkPushManager,
  checkNotificationSupport,
  subscribeToNotifications,
  unsubscribeFromNotifications,
  checkIsSubscribed,
  sendNotification
} from "./util/NotificationAccess";
import { generateToken } from "./firebase";

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkAllPermissions = useCallback(async () => {
    await registerServiceWorker();
    await checkPushManager();
    await checkNotificationSupport();
    // const isSubscribed = await checkIsSubscribed();
    // setIsSubscribed(isSubscribed);
  }, []);

  useEffect(() => {
    checkAllPermissions();
  }, [checkAllPermissions]);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("[SW]: SCOPE: ", registration.scope);
        return registration.scope;
      })
      .catch(function (err) {
        return err;
      });
  }

  return (
    <div>
      {/* {isSubscribed ? "Subscribed" : "Not subscribed"}
      {isSubscribed ? (
        <button
          onClick={async (e) => {
            await unsubscribeFromNotifications();
            setIsSubscribed(false);
          }}
        >
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={async (e) => {
            await subscribeToNotifications();
            setIsSubscribed(true);
          }}
        >
          Subscribe
        </button>
      )} */}

      <button
        onClick={subscribeToNotifications}
      >
        FCM Subscribe
      </button>
      <form onSubmit={sendNotification}>
        <input placeholder="Enter token" />
        <button type="submit">Send</button>
      </form>
      <button
          onClick={unsubscribeFromNotifications}
        >
          Unsubscribe
        </button>
      
    </div>
  );
}

export default App;
