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
  try {
    const docRef = await addDoc(collection(db, "enrollments"), {
      userId: userId,     // This MUST match the rule (request.resource.data.userId)
      courseId: courseId,
      courseTitle: courseTitle,
      enrolledAt: new Date(),
      status: "active",
      progress: 0
    });
    return docRef;
  } catch (error) {
    console.error("Enrollment Service Error:", error);
    throw error;
  }
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