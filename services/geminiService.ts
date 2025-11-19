import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if API key is present to avoid runtime crashes on init
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateFunnyDescription = async (itemName: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key not found.");
    return "Ho ho ho! I need my magic API key to write this!";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a cheeky Christmas Elf writing a letter to Santa Claus. 
    Write a very short (max 2 sentences), funny, and persuasive reason why I absolutely deserve this item: "${itemName}". 
    Be playful.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "The elves are on a break! (Error connecting to magic cloud)";
  }
};
