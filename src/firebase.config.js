import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "house-marketplace-15037.firebaseapp.com",
  projectId: "house-marketplace-15037",
  storageBucket: "house-marketplace-15037.appspot.com",
  messagingSenderId: "177508403249",
  appId: "1:177508403249:web:f897d539c541feff1fed10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
