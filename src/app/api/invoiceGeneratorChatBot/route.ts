import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const backendURL = process.env.INV_GEN_CHATBOT_URL;

    if (!backendURL) {
      console.error("Missing INV_GEN_CHATBOT_URL in env");
      return NextResponse.json({ error: "Chatbot URL not configured" }, { status: 500 });
    }

    // 🔁 Send to your backend server
    const backendResponse = await fetch(`${backendURL}/velqen-inv-gen-chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: message }),
    });

    const data = await backendResponse.json();

    // 🧠 Optional: handle backend errors gracefully
    if (!backendResponse.ok) {
      return NextResponse.json({ error: data.error || 'Backend error' }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
