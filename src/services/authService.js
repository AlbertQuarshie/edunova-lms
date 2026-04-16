import { auth, db } from "../config/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// FIX: Ensure this name matches the import in Register.jsx exactly
export const registerStudent = async (email, password, fullName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  const userData = {
    uid: user.uid,
    name: fullName,
    email: email,
    role: "student", // All new registrations are students by default
    createdAt: serverTimestamp()
  };

  await setDoc(doc(db, "users", user.uid), userData);
  return { ...user, role: "student" };
};

export const loginUser = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", user.uid));
  
  if (userDoc.exists()) {
    return { ...user, role: userDoc.data().role };
  }
  return { ...user, role: 'student' };
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