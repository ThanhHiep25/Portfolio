
import { GoogleGenAI, Modality } from "@google/genai";

// Cache bền vững trong phiên làm việc để tránh gọi API trùng lặp
const getCache = () => {
  try {
    const cached = sessionStorage.getItem('alex_ai_cache');
    return cached ? JSON.parse(cached) : {};
  } catch { return {}; }
};

const saveCache = (key: string, value: { text: string; audio?: string }) => {
  try {
    const cache = getCache();
    cache[key] = value;
    sessionStorage.setItem('alex_ai_cache', JSON.stringify(cache));
  } catch (e) { console.warn("Cache storage full"); }
};

export const chatWithGeminiStream = async (
  message: string,
  history: { role: 'user' | 'model'; content: string }[],
  onTextChunk: (chunk: string) => void
): Promise<{ fullText: string; audioPromise: Promise<string | undefined> }> => {
  const cacheKey = message.toLowerCase().trim().substring(0, 100);
  const cache = getCache();
  
  // 1. Phản hồi tức thì nếu có trong Cache
  if (cache[cacheKey]) {
    const cached = cache[cacheKey];
    onTextChunk(cached.text);
    return { fullText: cached.text, audioPromise: Promise.resolve(cached.audio) };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // System instruction cực đoan về tốc độ: Yêu cầu trả lời siêu ngắn
  const systemInstruction = "Bạn là Alex, trợ lý của Hiệp. Trả lời hóm hỉnh, SIÊU NGẮN (dưới 12 từ). Xưng Alex, gọi Bạn.";

  // Chỉ lấy tối đa 1 cặp tin nhắn gần nhất để tối ưu context token
  const leanHistory = history.slice(-1);
  const chatHistoryStr = leanHistory.map(h => `${h.role === 'user' ? 'U' : 'A'}: ${h.content}`).join('\n');
  const finalPrompt = `${chatHistoryStr}\nU: ${message}`;

  // Gọi stream text
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
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
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });
      const audioData = speechResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
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
