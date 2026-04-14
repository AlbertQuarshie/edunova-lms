import { db } from "../config/firebaseConfig";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";

// Get all courses for the list view
export const getAllCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get details for a single course page
export const getCourseDetails = async (courseId) => {
  const docRef = doc(db, "courses", courseId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};