import {initializeApp} from 'firebase/app'
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import {getFirestore } from 'firebase/firestore'
import  {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const messaging = getMessaging(firebaseApp);

const generateToken = async () => {
    const token = await getToken(messaging, {vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY});
    console.log(token);
    return token;
}

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});

const googleAuthProvider = new GoogleAuthProvider();
export { auth,db, googleAuthProvider, messaging, generateToken};
export default firebaseApp