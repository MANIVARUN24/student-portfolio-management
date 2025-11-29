// Example firebase.js - replace config with your project keys
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTHDOMAIN",
  projectId: "YOUR_FIREBASE_PROJECTID",
  appId: "YOUR_FIREBASE_APPID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
