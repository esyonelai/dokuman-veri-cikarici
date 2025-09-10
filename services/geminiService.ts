import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY! });

const fileToBase64 = async (file: File): Promise<{ mimeType: string, base64: string }> => {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
  return { mimeType: file.type, base64 };
};

// Fix: The responseSchema for Type.OBJECT cannot have empty properties.
// The schema is now dynamically generated only when fields are known.
const callGemini = async (prompt: string, imagePart: any, fields?: string[]): Promise<ExtractedData> => {
    const textPart = { text: prompt };

    const config: {
        responseMimeType: "application/json",
        responseSchema?: object
    } = {
        responseMimeType: "application/json",
    };

    if (fields && fields.length > 0) {
        const properties: { [key: string]: { type: Type } } = {};
        fields.forEach(field => {
            properties[field] = { type: Type.STRING }; // Using STRING as a general type
        });
        config.responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: properties,
            }
        };
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
            parts: [textPart, imagePart],
        },
        config,
    });

    const responseText = response.text.trim();
    
    try {
        let jsonData = responseText;
        if (jsonData.startsWith('```json')) {
            jsonData = jsonData.substring(7, jsonData.length - 3).trim();
        } else if (jsonData.startsWith('```')) {
            jsonData = jsonData.substring(3, jsonData.length - 3).trim();
        }

        const parsedData = JSON.parse(jsonData);
        if (!Array.isArray(parsedData)) {
            throw new Error("Çıkarılan veri bir dizi değil.");
        }
        
        return parsedData;
    } catch (error) {
        console.error("Gemini'den gelen JSON yanıtı ayrıştırılırken hata oluştu:", error);
        console.error("Ham yanıt:", responseText);
        throw new Error("Çıkarılan veri geçerli JSON olarak ayrıştırılamadı.");
    }
};

export const extractInitialDataForTemplate = async (file: File): Promise<ExtractedData> => {
    const { mimeType, base64 } = await fileToBase64(file);
    const imagePart = { inlineData: { data: base64, mimeType } };
    const prompt = "Bu bir şablon oluşturma adımıdır. Bu belgedeki yapılandırılmış verilerden çıkarılabilecek TÜM olası sütun başlıklarını (alanları) titizlikle analiz et. Eğer 'Gün', 'Ay', 'Yıl' gibi ayrı tarih alanları bulursan, bunları birleştirerek 'Tarih' adında DD-MM-YYYY formatında tek bir sütun oluştur. Belgedeki verileri, bulduğun bu sütun başlıklarını anahtar olarak kullanarak bir JSON nesne dizisine dönüştür. Amaç, kullanıcıya seçebileceği en kapsamlı alan listesini sunmaktır, bu yüzden hiçbir potansiyel sütunu atlama. Yanıt olarak sadece ve sadece ham JSON dizisini döndür, başka hiçbir açıklama veya metin ekleme.";
    return callGemini(prompt, imagePart);
};


export const extractDataUsingTemplate = async (file: File, fields: string[]): Promise<ExtractedData> => {
    const { mimeType, base64 } = await fileToBase64(file);
    const imagePart = { inlineData: { data: base64, mimeType } };
    const prompt = `Bu belgeden, yalnızca şu alanları çıkar: ${fields.join(', ')}. Eğer 'Gün', 'Ay', 'Yıl' gibi ayrı tarih alanları bulursan, bunları birleştirerek 'Tarih' adında DD-MM-YYYY formatında tek bir sütun oluştur. Diğer tarihleri 'DD-MM-YYYY' formatında, sayısal değerleri ise para birimi veya binlik ayraçları olmadan (örneğin '1234.56') formatla. Sonucu, belirtilen alanları anahtar olarak kullanan bir JSON nesne dizisi olarak döndür.`;
    return callGemini(prompt, imagePart, fields);
};