import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such profile found!");
  }
};