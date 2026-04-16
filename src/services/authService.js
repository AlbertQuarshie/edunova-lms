import { auth, db } from "../config/firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

/**
 * Helper to fetch user role from Firestore
 */
const getUserWithRole = async (user) => {
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    return { ...user, role: userDoc.data().role };
  }
  return { ...user, role: 'student' }; // Default fallback
};

export const loginUser = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return await getUserWithRole(user);
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    const newUserData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: "student",
      createdAt: serverTimestamp()
    };
    await setDoc(userDocRef, newUserData);
    return { ...user, role: "student" };
  }
  return { ...user, role: userDoc.data().role };
};

export const logoutUser = () => signOut(auth);