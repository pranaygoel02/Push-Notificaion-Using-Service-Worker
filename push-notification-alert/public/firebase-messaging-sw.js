importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyB6W54OGBnux3Kvs9HqxaNFiUziM55al7A",
    authDomain: "notification-demo-e9fb0.firebaseapp.com",
    projectId: "notification-demo-e9fb0",
    storageBucket: "notification-demo-e9fb0.appspot.com",
    messagingSenderId: "584996861682",
    appId: "1:584996861682:web:71fd6bd9525d2750c3826b"
  };
  firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});