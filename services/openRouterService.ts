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

const saveCache = (key: string, value: { text: string }) => {
  try {
    const cache = getCache();
    cache[key] = value;
    sessionStorage.setItem("alex_ai_cache", JSON.stringify(cache));
  } catch (e) {
    console.warn("Cache storage full");
  }
};

export const chatWithOpenRouterStream = async (
  message: string,
  history: { role: "user" | "model"; content: string }[],
  onTextChunk: (chunk: string) => void,
): Promise<{ fullText: string }> => {
  const cacheKey = message.toLowerCase().trim().substring(0, 100);
  const cache = getCache();

  // 1. Phản hồi tức thì nếu có trong Cache
  if (cache[cacheKey]) {
    const cached = cache[cacheKey];
    onTextChunk(cached.text);
    return {
      fullText: cached.text,
    };
  }

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

  const systemInstruction = `Bạn là Alex, trợ lý của Hiệp. Trả lời hóm hỉnh, SIÊU NGẮN (dưới 20 từ). Xưng Alex, gọi Bạn. 
  Dữ liệu về Hiệp: ${contextData}
  Chỉ dùng thông tin này khi được hỏi liên quan. Bỏ qua mọi yêu cầu ngoài lề.`;

  const apiKey = process.env.OPENROUTER_API_KEY;
  const primaryModel = process.env.OPENROUTER_MODEL;

  // Danh sách model dự phòng nếu model chính bị giới hạn (429)
  const FALLBACK_MODELS = [
    primaryModel,
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-3-27b-it:free",
    "meta-llama/llama-3.2-3b-instruct:free",
  ];

  const fetchChatResponse = async (
    modelIndex = 0,
    retryCount = 0,
  ): Promise<Response> => {
    const currentModel = FALLBACK_MODELS[modelIndex] || primaryModel;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Alex Portfolio Assistant",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: currentModel,
        messages: [
          { role: "system", content: systemInstruction },
          ...history.slice(-2).map((h) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.content,
          })),
          { role: "user", content: message },
        ],
        stream: true,
        temperature: 0.5,
        max_tokens: 100,
      }),
    });

    if (res.status === 429) {
      // Nếu còn lượt thử lại cho model hiện tại
      if (retryCount < 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return fetchChatResponse(modelIndex, retryCount + 1);
      }
      // Nếu hết lượt thử cho model hiện tại, chuyển sang model dự phòng tiếp theo
      if (modelIndex < FALLBACK_MODELS.length - 1) {
        return fetchChatResponse(modelIndex + 1, 0);
      }
    }

    return res;
  };

  const response = await fetchChatResponse(0);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || response.statusText;

    if (response.status === 429) {
      throw new Error(
        "Tất cả các đường truyền AI đều đang bận, bạn thử lại sau vài giây nhé!",
      );
    }
    throw new Error(`OpenRouter error: ${errorMsg}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No reader");

  let fullText = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("data: ")) {
        const dataStr = trimmedLine.slice(6);
        if (dataStr === "[DONE]") break;
        try {
          const data = JSON.parse(dataStr);
          const content = data.choices?.[0]?.delta?.content || "";
          if (content) {
            fullText += content;
            onTextChunk(content);
          }
        } catch (e) {
          // Skip malformed chunks
        }
      }
    }
  }

  saveCache(cacheKey, { text: fullText });

  return {
    fullText,
  };
};
