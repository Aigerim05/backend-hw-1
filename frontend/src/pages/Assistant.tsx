// frontend/src/pages/Assistant.tsx
import { useState } from 'react';
import { askAssistant } from '../api/assistant';

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<{ openai_agent: string; langchain_agent: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await askAssistant(input);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🤖 Assistant Chat</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Спроси что угодно..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Жду ответа...' : 'Отправить'}
      </button>

      {response && (
        <div style={{ marginTop: 20 }}>
          <p><strong>OpenAI Agent:</strong> {response.openai_agent}</p>
          <p><strong>LangChain Agent:</strong> {response.langchain_agent}</p>
        </div>
      )}
    </div>
  );
}
