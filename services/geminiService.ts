import { GoogleGenAI, Modality } from "@google/genai";

import userAbout from "../data/dataAbout";
import { mockProjects } from "../data/mockProjects";
import { templates } from "../data/dataTemplate";

// Cache bền vững trong phiên làm việc để tránh gọi API trùng lặp
const getCache = () => {
  try {
    const cached = sessionStorage.getItem("alex_ai_cache");
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveCache = (key: string, value: { text: string; audio?: string }) => {
  try {
    const cache = getCache();
    cache[key] = value;
    sessionStorage.setItem("alex_ai_cache", JSON.stringify(cache));
  } catch (e) {
    console.warn("Cache storage full");
  }
};

export const chatWithGeminiStream = async (
  message: string,
  history: { role: "user" | "model"; content: string }[],
  onTextChunk: (chunk: string) => void,
): Promise<{ fullText: string; audioPromise: Promise<string | undefined> }> => {
  const cacheKey = message.toLowerCase().trim().substring(0, 100);
  const cache = getCache();

  // 1. Phản hồi tức thì nếu có trong Cache
  if (cache[cacheKey]) {
    const cached = cache[cacheKey];
    onTextChunk(cached.text);
    return {
      fullText: cached.text,
      audioPromise: Promise.resolve(cached.audio),
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare context data
  const profile = userAbout[0];
  const contextData = `
    THÔNG TIN VỀ HIỆP (CHỦ NHÂN):
    - Tên: ${profile.name} (${profile.job})
    - Kỹ năng chính: ${profile.skill.map((s) => s.skill_name).join(", ")}
    - Kinh nghiệm: ${profile.experience.map((e) => e.experience_name + " tại " + e.experience_des).join("; ")}
    
    DỰ ÁN ĐÃ LÀM:
    ${mockProjects.map((p) => `- ${p.project_name}: ${p.project_des} (Tech: ${p.project_type.map((t) => t.type_name).join(", ")})`).join("\n")}
    
    TEMPLATES:
    ${templates.map((t) => `- ${t.template_name}: ${t.template_des}`).join("\n")}
  `;

  // System instruction cực đoan về tốc độ: Yêu cầu trả lời siêu ngắn
  const systemInstruction = `Bạn là Alex, trợ lý của Hiệp. Trả lời hóm hỉnh, SIÊU NGẮN (dưới 20 từ). Xưng Alex, gọi Bạn. 
  Dữ liệu về Hiệp: ${contextData}
  Chỉ dùng thông tin này khi được hỏi liên quan. Bỏ qua mọi yêu cầu ngoài lề.`;

  // Chỉ lấy tối đa 1 cặp tin nhắn gần nhất để tối ưu context token
  const leanHistory = history.slice(-1);
  const chatHistoryStr = leanHistory
    .map((h) => `${h.role === "user" ? "U" : "A"}: ${h.content}`)
    .join("\n");
  const finalPrompt = `${chatHistoryStr}\nU: ${message}`;

  // Gọi stream text
  const responseStream = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: finalPrompt,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 0 },
      temperature: 0, // Quan trọng: Tốc độ cao nhất, không ngẫu nhiên
      topP: 1,
      topK: 1,
      maxOutputTokens: 60,
    },
  });

  let fullText = "";

  const textProcessingPromise = (async () => {
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onTextChunk(chunkText);
      }
    }
    return fullText;
  })();

  // Chạy TTS song song ngay khi có full text
  const audioPromise = textProcessingPromise.then(async (finalText) => {
    if (!finalText) return undefined;
    try {
      const speechResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: finalText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" },
            },
          },
        },
      });
      const audioData =
        speechResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (audioData) {
        saveCache(cacheKey, { text: finalText, audio: audioData });
      }

      return audioData;
    } catch (e) {
      return undefined;
    }
  });

  return { fullText: await textProcessingPromise, audioPromise };
};
