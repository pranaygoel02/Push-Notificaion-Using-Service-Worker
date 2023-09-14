import urlBase64ToUint8Array from "./urlBase64ToUint8Array";
import axiosInstance from "../axios/axiosInstance";

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
    try {
        const res = await axiosInstance.post('/notifications/subscribe', pushSubscription, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
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


export {subscribeToNotifications, registerServiceWorker, checkPushManager, checkNotificationSupport, unsubscribeFromNotifications, checkIsSubscribed };
