
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always use a named parameter and obtain the API key exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getChatResponse(history: ChatMessage[], language: string = 'en') {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are MoroVoyage Assistant, a smart travel expert for Morocco.
    The user's current interface language is: ${language}.
    
    Guidelines:
    - ALWAYS respond in the user's language (${language}).
    - Support English, French, Arabic, Spanish, etc.
    - Mention specific operators: ONCF (Train), CTM/Supratours (Bus), Royal Air Maroc (Flight).
    - Provide advice on comfort, price, and duration.
    - Keep responses professional, helpful, and concise.
  `;

  try {
    // Correctly map ChatMessage history to GenAI contents format.
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
      },
    });

    // Extracting text output directly from response.text property.
    return response.text || "Error processing request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please try again.";
  }
}
