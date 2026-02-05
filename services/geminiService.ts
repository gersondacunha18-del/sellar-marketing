
import { GoogleGenAI, Modality } from "@google/genai";

/* Guideline: Implement manual base64 decoding to handle raw PCM bytes from Gemini API */
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/* Guideline: Implement manual audio buffer creation for raw PCM data streams */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/* Guideline: Always use a function to create a new instance with the latest API key */
const getApiKey = () => {
  const key = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (!key) {
    throw new Error('Missing GEMINI API key. Set VITE_GEMINI_API_KEY in .env.local');
  }
  return key;
};

const getAI = () => new GoogleGenAI({ apiKey: getApiKey() });

export const getSmartChatResponse = async (userMessage: string, history: any[]) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'models/gemini-flash-latest',
      contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: "Você é o 'Sellar Guard'. Especialista em agro, leilões e segurança financeira. Use português do Brasil, tom executivo e ajude o usuário com lances e comissões."
      }
    });
    /* Guideline: Use the .text property directly */
    return response.text;
  } catch (e) { 
    console.error("Chat Error", e);
    return "Desculpe, a IA está em manutenção no momento."; 
  }
};

export const generateAIResponse = async (userMessage: string, history: any[]) => {
  return getSmartChatResponse(userMessage, history);
};

export const enhanceDescription = async (title: string, desc: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'models/gemini-flash-latest',
      contents: `Transforme esta descrição em um anúncio premium para leilão de elite: Título: ${title}, Base: ${desc}`,
    });
    /* Guideline: Use the .text property directly */
    return response.text;
  } catch (e) { 
    console.error("Enhance Error", e);
    return desc; 
  }
};

export const speakDescription = async (text: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Diga de forma clara e elegante: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      /* Guideline: Manual decoding of raw PCM audio data */
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioContext,
        24000,
        1
      );
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (e) { 
    console.error("TTS Error", e); 
  }
};
