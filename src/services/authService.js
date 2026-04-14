import { auth, db } from "../config/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Register a new student 
export const registerStudent = async (email, password, fullName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Initialize student profile in Firestore 
  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email: email,
    role: "student",
    createdAt: new Date()
  });
  return user;
};

// Login existing student
export const loginStudent = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => signOut(auth);