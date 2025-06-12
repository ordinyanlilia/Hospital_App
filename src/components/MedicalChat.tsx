import React, { useRef, useEffect, useState } from 'react';
import './OnikBot.css';
import { apiKey } from '../services/constants';
import { useTranslate } from '../context/TranslationProvider';

const geminiKey = apiKey;

type MessageType = { text: string; sender: 'user' | 'bot' };

type Props = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  onBack: () => void;
};

export default function MedicalChat({ messages, setMessages }: Props) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { translate } = useTranslate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
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
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: input }]
          }
        ]
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('Gemini Response:', result);

      let botReply = translate('bot_error');

      // ✅ Extract text from Gemini response safely
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        botReply = text;
      } else {
        console.error('Unexpected response structure:', result);
      }

      const geminiMessage: MessageType = { text: botReply, sender: 'bot' };
      setMessages(prev => [...prev, geminiMessage]);
    } catch (err) {
      console.error('API request failed:', err);
      setMessages(prev => [...prev, {
        text: translate('general_error'),
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`medical-chat-container ${visible ? 'fade-in' : ''}`}>
      <div className="medical-chat-header">
        {translate('operator_title')}
      </div>

      <div className="medical-chat-messages">
        <div className="operator-intro">{translate('operator_intro')}</div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`medical-chat-message ${
              msg.sender === 'user' ? 'user-message' : 'gemini-message'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="loading-message">{translate('typing')}</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="medical-chat-input-container">
        <textarea
          className="medical-chat-textarea"
          rows={1}
          placeholder={translate('enter_placeholder')}
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
          {translate('send_button')}
        </button>
      </div>
    </div>
  );
}
