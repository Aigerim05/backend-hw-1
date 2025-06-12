// frontend/src/api/assistant.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const askAssistant = async (message: string): Promise<{ openai_agent: string; langchain_agent: string }> => {
  const response = await axios.post(`${BASE_URL}/assistant`, { message });
  return response.data;
};
