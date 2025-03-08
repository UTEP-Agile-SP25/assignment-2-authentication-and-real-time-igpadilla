// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKutE_M8ka4LripmY6m4oojuX8VjqPabI",
  authDomain: "padilla-sandbox.firebaseapp.com",
  projectId: "padilla-sandbox",
  storageBucket: "padilla-sandbox.firebasestorage.app",
  messagingSenderId: "428665652321",
  appId: "1:428665652321:web:b490e2236d29f55c215620",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
