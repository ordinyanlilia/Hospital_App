import React, { useRef, useEffect, useState } from 'react';
import './OnikBot.css';
import { apiKey } from '../services/constants';

const geminiKey = apiKey;

type MessageType = { text: string; sender: 'user' | 'bot' };

type Props = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  onBack: () => void;
};

export default function MedicalChat({ messages, setMessages, onBack }: Props) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10); // Trigger fade-in transition
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: MessageType = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [{ role: 'user', parts: [{ text: input }] }];
      const payload = { contents: chatHistory };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      let geminiText = 'Ներողություն, չհաջողվեց ստանալ պատասխան։';

      if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        geminiText = result.candidates[0].content.parts[0].text;
      }

      const geminiMessage: MessageType = { text: geminiText, sender: 'bot' };
      setMessages(prev => [...prev, geminiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        text: 'Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել կրկին։',
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`medical-chat-container ${visible ? 'fade-in' : ''}`}>
      <div className="medical-chat-header">
        «911» Օպերատոր
       
      </div>

      <div className="medical-chat-messages">
        <div className="operator-intro">
          
          Բարի գալուստ։ Խնդրում ենք գրել ձեր հարցը։
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`medical-chat-message ${msg.sender === 'user' ? 'user-message' : 'gemini-message'}`}>
            {msg.text}
          </div>
        ))}

        {isLoading && <div className="loading-message">Մուտքագրում...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="medical-chat-input-container">
        <textarea
          className="medical-chat-textarea"
          rows={1}
          placeholder="Մուտքագրեք..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ''}
        >
          Ուղարկել
        </button>
      </div>
    </div>
  );
}
