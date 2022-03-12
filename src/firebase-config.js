import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCS8YQ2Lml3sGagEsgrS6GZUPhIbFalOi0",
    authDomain: "xchat-v0.firebaseapp.com",
    projectId: "xchat-v0",
    storageBucket: "xchat-v0.appspot.com",
    messagingSenderId: "223605921326",
    appId: "1:223605921326:web:447eb4f83f6f0a545431bf",
    measurementId: "G-S6EJBWZJCK",
});

export const auth = getAuth(app);
export const db = getFirestore();
