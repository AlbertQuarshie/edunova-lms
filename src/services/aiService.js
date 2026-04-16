import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const askTutor = async (userQuestion, courseContext = "") => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });


    const prompt = `
      You are an expert tutor for EduNova LMS. 
      Below is the list of courses currently available in our Firestore database:
      ${courseContext}

      Use this information to answer the student's question accurately. 
      If they ask about a course not listed, tell them we don't offer it yet.
      
      Student Question: "${userQuestion}"
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm having trouble accessing the course catalog right now.";
  }
};