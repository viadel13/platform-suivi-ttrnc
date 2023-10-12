import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIn7G63Emx6iRZeA7dg2T3Q9Psdirvxp8",
  authDomain: "platform-suivi-ttrnc.firebaseapp.com",
  projectId: "platform-suivi-ttrnc",
  storageBucket: "platform-suivi-ttrnc.appspot.com",
  messagingSenderId: "468612254328",
  appId: "1:468612254328:web:642adfc44e36fb72b33b8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();