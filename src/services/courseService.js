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

// Fetch all courses
export const getAllCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Fetch single course details
export const getCourseById = async (courseId) => {
  const docRef = doc(db, "courses", courseId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  throw new Error("Course not found");
};

// Enroll a student in a course
export const enrollInCourse = async (userId, courseId, courseTitle) => {
  // Check if already enrolled to prevent duplicates
  const q = query(
    collection(db, "enrollments"), 
    where("userId", "==", userId), 
    where("courseId", "==", courseId)
  );
  
  const existing = await getDocs(q);
  if (!existing.empty) {
    throw new Error("You are already enrolled in this course!");
  }

  // Create the enrollment document
  return await addDoc(collection(db, "enrollments"), {
    userId,
    courseId,
    courseTitle,
    enrolledAt: new Date(),
    status: "active",
    progress: 0
  });
};

// Fetch all enrollments for a specific student
export const getStudentEnrollments = async (userId) => {
  const q = query(
    collection(db, "enrollments"), 
    where("userId", "==", userId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};