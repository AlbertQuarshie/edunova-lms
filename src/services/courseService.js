import { db } from "../config/firebaseConfig";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  where 
} from "firebase/firestore";

export const getAllCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCourseById = async (courseId) => {
  const docRef = doc(db, "courses", courseId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  throw new Error("Course not found");
};

// ENROLLMENT LOGIC UPDATED TO 'PENDING'
export const enrollInCourse = async (userId, courseId, courseTitle) => {
  try {
    const docRef = await addDoc(collection(db, "enrollments"), {
      userId: userId,
      courseId: courseId,
      courseTitle: courseTitle,
      enrolledAt: new Date(),
      status: "pending", // Students now start in pending state
      progress: 0
    });
    return docRef;
  } catch (error) {
    console.error("Enrollment Service Error:", error);
    throw error;
  }
};

export const getStudentEnrollments = async (userId) => {
  const q = query(collection(db, "enrollments"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};