// Import the functions you need from the SDKs you need
import { getApps, getApp, deleteApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, setPersistence,browserSessionPersistence } from 'firebase/auth'
import { browser } from "$app/environment";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId
};

// ^code above taken from firebase get started website^

// Initialize Firebase
let app_init;
if (getApps().length) {
    //Case if Sveltekit erroneously initializes an empty app.
    app_init = getApp();
    deleteApp(app_init)
}

app_init = initializeApp(firebaseConfig, "CLIENT");

const firebase_app = app_init;
// const analytics = getAnalytics(firebase_app);

//export const db = getFirestore(firebase_app) <- Database (when we implement it)
export const auth = getAuth(firebase_app)
setPersistence(auth, browserSessionPersistence)

