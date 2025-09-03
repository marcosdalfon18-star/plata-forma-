
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateJobDescription = async (
  title: string,
  responsibilities: string[]
): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("Error: API key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
    Actúa como un experto en Recursos Humanos.
    Escribe una descripción de puesto profesional y atractiva para el siguiente rol:

    Puesto: ${title}

    Responsabilidades clave:
    ${responsibilities.map(r => `- ${r}`).join('\n')}

    La descripción debe ser clara, concisa y estar orientada a atraer a los mejores talentos. Estructura la respuesta en secciones como "Resumen del puesto", "Responsabilidades principales" y "Calificaciones deseadas".
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating job description:", error);
    return "Hubo un error al generar la descripción con la IA. Por favor, inténtelo de nuevo más tarde.";
  }
};
