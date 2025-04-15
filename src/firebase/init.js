// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwTUyFB5K6Q4jclOF2DNm1LPIWQMvEY2M",
  authDomain: "animetopia-rpl.firebaseapp.com",
  projectId: "animetopia-rpl",
  storageBucket: "animetopia-rpl.firebasestorage.app",
  messagingSenderId: "920588567262",
  appId: "1:920588567262:web:919b283bff2551441cb84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };