import { auth, db } from "../config/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

// GOOGLE SIGN-IN
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Check if a profile exists, if not, create one
  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: "student",
      createdAt: new Date()
    });
  }
  return user;
};

// REGISTER: Email/Password
export const registerStudent = async (email, password, fullName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: fullName,
    email: email,
    role: "student",
    createdAt: new Date()
  });

  await signOut(auth); // Require login after registration
  return user;
};

// LOGIN: Email/Password
export const loginStudent = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const logoutUser = () => signOut(auth);