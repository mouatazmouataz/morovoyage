import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types";

// 1. Correctly access the key for a Vite/Vercel project
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Initialize the AI with the library's expected syntax
const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function getChatResponse(history: ChatMessage[], language: string = 'en') {
  // 3. Use the correct model name
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash"
  });

  const systemInstruction = `
    You are MoroVoyage Assistant, a smart travel expert for Morocco.
    The user's current interface language is: ${language}.
    
    Guidelines:
    - ALWAYS respond in the user's language (${language}).
    - Mention specific operators: ONCF (Train), CTM/Supratours (Bus), Royal Air Maroc (Flight).
    - Keep responses professional and concise.
  `;

  try {
    if (!API_KEY) {
      throw new Error("API Key is missing from Environment Variables");
    }

    // 4. Properly format history for the SDK
    const chat = model.startChat({
      history: history.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // 5. Send the latest message
    const lastMessage = history[history.length - 1].text;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please check your API key settings.";
  }
}