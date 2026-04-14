import { auth, db } from "../config/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// REGISTER: Creates account + Adds to 'users' collection
export const registerStudent = async (email, password, fullName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create a profile in Firestore so we know the student's name
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: fullName,
    email: email,
    role: "student",
    createdAt: new Date()
  });
  return user;
};

// LOGIN: Simple authentication
export const loginStudent = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const logoutUser = () => signOut(auth);