import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  registerServiceWorker,
  checkPushManager,
  checkNotificationSupport,
  subscribeToNotifications,
  unsubscribeFromNotifications,
  checkIsSubscribed,
} from "./util/NotificationAccess";

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkAllPermissions = useCallback(async () => {
    await registerServiceWorker();
    await checkPushManager();
    await checkNotificationSupport();
    const isSubscribed = await checkIsSubscribed();
    setIsSubscribed(isSubscribed);
  }, []);

  useEffect(() => {
    checkAllPermissions();
  }, [checkAllPermissions]);

  return (
    <div>
      {isSubscribed ? "Subscribed" : "Not subscribed"}
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
      )}
    </div>
  );
}

export default App;
