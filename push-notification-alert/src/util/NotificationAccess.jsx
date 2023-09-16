import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import axiosInstance from "../axios/axiosInstance";
import { generateToken } from "../firebase";
import axios from "axios";

const registerServiceWorker = async () => {
    if(!('serviceWorker' in navigator)) {
        console.log('Service worker not available');
        return;
    }
    const swRegistration = await navigator.serviceWorker.register('/sw.js');
    return swRegistration;
}

const checkPushManager = async () => {
    if(!('PushManager' in window)) {
        console.log('Push notification not supported');
        return;
    }
}

const checkNotificationSupport = async () => {
    if(!('Notification' in window)) {
        console.log('Notification API not supported');
        return;
    }
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    return permission !== 'granted';
}

const checkIsSubscribed = async () => {
    const sw = await navigator.serviceWorker.ready;
    const pushSubscription = await sw.pushManager.getSubscription();
    return pushSubscription !== null;
}

const subscribeToNotifications = async () => {
    
    if(await requestNotificationPermission()) {
        console.log('Permission not granted');
        return;
    }
    console.log('Permission granted');
    const sw = await navigator.serviceWorker.ready;
    const pushSubscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY)
    });
    console.log(pushSubscription);
    const token = await generateToken();
    try {
        // const res = await axiosInstance.post('/notifications/subscribe', pushSubscription, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // console.log(res);
        const fcmRes = await axiosInstance.post('/fcm/subscribe', {token}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(fcmRes);
        // const response = await axios.post(
        //     "https://fcm.googleapis.com/fcm/send",
        //     {
        //       to: token,
        //       notification: {
        //         title: "Alert",
        //         body: "This is a Test Notification",
        //         icon: "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png",
        //       },
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization:
        //           "key=AAAAiDSHtvI:APA91bGLA0aV0X1VY874_Eq-riz-nCObFiNbRxwaLBS3fvwXZsXNNXTOVr99Ro8vfSA89td58p4faAJYyLsGMbb-utx0e8HjdpbXSWbW3dS0Uf17q2gyF8moxuUhiBNem6K7NOLhPDFe",
        //       },
        //     }
        //   );
        //   console.log(response.data);
    }
    catch(err) {
        console.log(err);
        console.log('Failed to subscribe');
        await pushSubscription.unsubscribe();
    }   
}

const unsubscribeFromNotifications = async () => {
    const sw = await navigator.serviceWorker.ready;
    const pushSubscription = await sw.pushManager.getSubscription();
    const {endpoint} = pushSubscription;
    const res = await axiosInstance.delete('/notifications/unsubscribe', {endpoint}, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log(res);
    if(res.status === 200) {
        await pushSubscription.unsubscribe();
    }
}

const sendNotification = async (e) => {
    e.preventDefault();
    const token = e.target[0].value;
    const res = await axiosInstance.post('/fcm/send', {fcmToken : token}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(res);
}


export {subscribeToNotifications, registerServiceWorker, checkPushManager, checkNotificationSupport, unsubscribeFromNotifications, checkIsSubscribed, sendNotification };
