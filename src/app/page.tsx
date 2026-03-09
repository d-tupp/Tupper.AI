"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<{ query: string }>();

  const onSubmit = async (data: { query: string }) => {
    const userMessage: Message = { role: 'user', content: data.query };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: data.query }),
      });
      const { reply } = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TupperAI: Tupper Family Tree</h1>
      <p className="mb-6">Ask questions about the family tree, e.g., "Who are the children of Sir Charles Tupper?"</p>

      {/* Chat Container */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <input
          {...register('query', { required: true })}
          type="text"
          placeholder="Type your question..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </form>

      {/* Existing Tree Visualization */}
      <div id="tree-container" className="mt-8"></div>
      {/* Add your D3.js script here or import as a component */}
    </main>
  );
}
