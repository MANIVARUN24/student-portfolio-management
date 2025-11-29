import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYt-6VRkBzX6o4C2f2Usp2SMr6EXf_I78",
  authDomain: "student-portfolio-app.firebaseapp.com",
  projectId: "student-portfolio-app",
  storageBucket: "student-portfolio-app.firebasestorage.app",
  messagingSenderId: "603201007264",
  appId: "1:603201007264:web:b25e26a9e97ad6f402e3c5",
  measurementId: "G-YT59XP1HP0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
