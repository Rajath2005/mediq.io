import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_SEARCH_API_KEY;

let genAI = null;
if (API_KEY) {
  console.log("Gemini API Key found and configured.");
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.error("REACT_APP_GEMINI_SEARCH_API_KEY is missing in environment variables.");
}

export const fetchMedicineDetails = async (medicineName) => {
  if (!genAI) {
    console.error("Gemini Search API Key is missing. Cannot fetch details.");
    return null;
  }

  try {
    console.log(`Fetching details for: ${medicineName}`);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      You are an expert Ayurvedic pharmacist. 
      Search for the Ayurvedic medicine "${medicineName}".
      If it exists, return a JSON object with the following fields EXACTLY:
      {
        "name_of_medicine": "${medicineName}",
        "main_indications": "Comma separated list of main indications (Sanskrit/English terms)",
        "dose": "Standard dosage",
        "class": "Class of medicine (e.g., Arishta, Asava, Vati, Churna)",
        "description": "A brief 1-2 sentence description.",
        "dispensing_pack_size": "Common pack size (e.g., 200 ml, 500 mg)",
        "reference_text": "Classical reference text (e.g., AFI, AH, Charaka Samhita)"
      }
      If the medicine is not a valid Ayurvedic medicine or you are unsure, return null.
      Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Fetch Response:", text);

    try {
      // Clean up potential markdown formatting
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      return null;
    }
  } catch (error) {
    console.error("Error fetching medicine details from Gemini:", error);
    return null;
  }
};

export const enrichMedicineDetails = async (medicineName, existingData = {}) => {
  if (!genAI) {
    console.error("Gemini Search API Key is missing. Cannot enrich details.");
    return null;
  }

  try {
    console.log(`Enriching details for: ${medicineName}`);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      You are an expert Ayurvedic doctor.
      Provide comprehensive and detailed information for the Ayurvedic medicine "${medicineName}".
      Existing Data: ${JSON.stringify(existingData)}
      
      Return a JSON object with these additional details. Ensure all fields are filled with helpful content:
      {
        "description": "A detailed paragraph (at least 3-4 sentences) explaining what this medicine is, its historical significance, and its primary uses in Ayurveda.",
        "key_ingredients": ["List", "of", "at", "least", "5", "key", "ingredients", "with", "their", "botanical", "names", "if", "possible"],
        "benefits": ["List", "of", "at", "least", "4-5", "major", "health", "benefits"],
        "side_effects": ["List", "of", "potential", "side", "effects", "contraindications", "or", "safety", "precautions"],
        "usage_instructions": "Detailed usage instructions, including dosage for adults/children, best time to take, and preferred anupana (vehicle like warm water, milk, etc.)."
      }
      Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Enrichment Response:", text);

    try {
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Gemini enrichment response:", text);
      return { error: "Failed to parse AI response.", details: e.message };
    }
  } catch (error) {
    console.error("Error enriching medicine details from Gemini:", error);
    let errorMessage = "An error occurred while connecting to AI.";
    if (error.message?.includes('API key')) {
      errorMessage = "Invalid or missing API Key.";
    } else if (error.message?.includes('quota')) {
      errorMessage = "API Quota exceeded.";
    }
    return { error: errorMessage, details: error.message };
  }
};
