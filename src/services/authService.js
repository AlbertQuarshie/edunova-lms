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

// 1. GOOGLE SIGN-IN (With Role Check)
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if user already exists in Firestore
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    // New User: Create student profile by default
    await setDoc(userDocRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: "student", // Default role
      createdAt: serverTimestamp()
    });
  }
  return user;
};

// 2. REGISTER STUDENT (Email/Password)
export const registerStudent = async (email, password, fullName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: fullName,
    email: email,
    role: "student", // Explicitly set as student
    createdAt: serverTimestamp()
  });

  return user;
};

// 3. LOGIN (Standard)
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 4. LOGOUT
export const logoutUser = () => signOut(auth);