import { GoogleGenAI, Type } from "@google/genai";
import { AiColorResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateColorFromDescription = async (prompt: string): Promise<AiColorResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Identify a hex color that best matches this description: "${prompt}". Provide the hex code, a creative name for this specific shade, and a short one-sentence reason why it fits.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "The 6-character hex code, e.g., #FF5733" },
            name: { type: Type.STRING, description: "A creative name for the color" },
            description: { type: Type.STRING, description: "Why this color fits the prompt" },
          },
          required: ["hex", "name", "description"]
        },
        systemInstruction: "You are a color theory expert and designer. You help users find exact colors based on mood, objects, or abstract concepts."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiColorResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};