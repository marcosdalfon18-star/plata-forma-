
import { GoogleGenAI, Type } from "@google/genai";

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

export const generateCybersecurityPractices = async (): Promise<string[]> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  const prompt = `
    Actúa como un experto en ciberseguridad para PYMES.
    Genera una lista de 10 buenas prácticas de ciberseguridad fundamentales y accionables que cualquier PYME puede implementar.
    Cada práctica debe ser una frase corta y clara.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    practices: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                            description: "Una buena práctica de ciberseguridad."
                        }
                    }
                }
            }
        }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && Array.isArray(result.practices)) {
        return result.practices;
    } else {
        console.warn("Unexpected JSON structure from AI:", result);
        const practicesArray = Object.values(result).find(val => Array.isArray(val) && val.every(item => typeof item === 'string'));
        if (practicesArray) {
            return practicesArray as string[];
        }
        throw new Error("No se pudieron extraer las prácticas del formato recibido.");
    }

  } catch (error) {
    console.error("Error generating cybersecurity practices:", error);
    if (error instanceof Error && error.message.includes("No se pudieron extraer")) {
        throw error;
    }
    throw new Error("Hubo un error al generar las recomendaciones de ciberseguridad. Por favor, inténtelo de nuevo más tarde.");
  }
};
