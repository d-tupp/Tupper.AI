"use client";

import { NextRequest, NextResponse } from 'next/server';
import familyTree from '../../../data/familyTree.json'; // Adjust path as needed

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // Prompt for Grok API (or alternative)
  const systemPrompt = `You are a helpful AI assistant for the Tupper Family Tree. Use this data to answer queries: ${JSON.stringify(familyTree)}. Respond concisely and factually.`;

  try {
    // Call Grok API (replace with actual endpoint and key)
    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.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}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',  // or 'deepseek-r1', etc.
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
      }),
    });

    const data = await apiResponse.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ reply: 'Sorry, there was an error processing your query.' }, { status: 500 });
  }
}
