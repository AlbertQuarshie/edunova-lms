import { GoogleGenAI } from '@google/genai';
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ai = new GoogleGenAI({ 
    apiKey: import.meta.env.VITE_GEMINI_KEY 
});

/**
 * Fetches course data and asks the AI
 */
export const askTutor = async (userQuestion) => {
  try {
    // 1. Fetch live context from Firestore
    const querySnapshot = await getDocs(collection(db, "courses"));
    const context = querySnapshot.docs
      .map(doc => {
        const d = doc.data();
        return `COURSE: ${d.title} | CATEGORY: ${d.category} | INFO: ${d.description}`;
      })
      .join("\n");

    // 2. Call the 2026 Model
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: [{ role: 'user', parts: [{ text: userQuestion }] }],
      config: {
        systemInstruction: `
          You are the EduNova LMS Tutor. 
          Use this database of courses to answer:
          ${context}
          
          Guidelines:
          - If the course exists, explain it concisely.
          - If it's missing, suggest a similar category from the list.
          - Keep responses under 3 sentences and very friendly.
        `
      }
    });

    return response.text;
  } catch (error) {
    console.error('EduNova AI Error:', error);
    return "I'm having a bit of trouble syncing with the course list. Try again in a second!";
  }
};