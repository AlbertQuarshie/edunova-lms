import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxIQRvOHY8DCjA9XeFs-S52thEOBTpHMw",
  authDomain: "edunova-lms.firebaseapp.com",
  projectId: "edunova-lms",
  storageBucket: "edunova-lms.firebasestorage.app",
  messagingSenderId: "61735328527",
  appId: "1:61735328527:web:5a5f0a7dccc5505a29bc7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);

export const db =getFirestore(app);
export default app;
