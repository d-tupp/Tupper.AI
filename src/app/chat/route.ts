import { NextRequest, NextResponse } from 'next/server';
import familyTree from '../../../data/familyTree.json'; // Adjust path as needed

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // Prompt for Grok API (or alternative)
  const systemPrompt = `You are a helpful AI assistant for the Tupper Family Tree. Use this data to answer queries: ${JSON.stringify(familyTree)}. Respond concisely and factually.`;

  try {
    // Call Grok API (replace with actual endpoint and key)
    const apiResponse = await fetch('https://api.x.ai/grok/v1/chat', { // Hypothetical endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_GROK_API_KEY`,
      },
      body: JSON.stringify({
        model: 'grok-4', // Assuming model name
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
