// frontend/src/pages/Assistant.tsx
import { useState } from 'react';
import { askAssistant } from '../api/assistant';

interface Message {
  sender: 'user' | 'openai_agent' | 'langchain_agent';
  content: string;
}

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', content: input };
    setConversation(prev => [...prev, userMessage]);
    setLoading(true);
    const res = await askAssistant(input);
    setConversation(prev => [
      ...prev,
      { sender: 'openai_agent', content: res.openai_agent },
      { sender: 'langchain_agent', content: res.langchain_agent },
    ]);
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🤖 Assistant Chat</h2>
      <div style={{ minHeight: 300, border: '1px solid #eee', padding: 10, marginBottom: 10, borderRadius: 8, background: '#fafbfc' }}>
        {conversation.length === 0 && <div style={{ color: '#aaa' }}>Начни диалог...</div>}
        {conversation.map((msg, idx) => (
          <div key={idx} style={{ margin: '10px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{ fontWeight: 'bold', color: msg.sender === 'user' ? '#1976d2' : msg.sender === 'openai_agent' ? '#388e3c' : '#f57c00' }}>
              {msg.sender === 'user' ? 'Вы' : msg.sender === 'openai_agent' ? 'OpenAI Agent' : 'LangChain Agent'}:
            </span>
            <span style={{ marginLeft: 8 }}>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Спроси что угодно..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        disabled={loading}
      />
      <button onClick={handleSend} disabled={loading || !input.trim()}>
        {loading ? 'Жду ответа...' : 'Отправить'}
      </button>
    </div>
  );
}
