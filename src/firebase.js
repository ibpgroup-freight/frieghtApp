// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMc02Ib4HfjEeKp6Cpi_yXo42VhIhbAbc",
    authDomain: "freightwebsite.firebaseapp.com",
    projectId: "freightwebsite",
    storageBucket: "freightwebsite.appspot.com",
    messagingSenderId: "608611537630",
    appId: "1:608611537630:web:6b2b50803bcfd77bbd284f",
    measurementId: "G-SZQMQ0YC71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage()
const analytics = getAnalytics(app);