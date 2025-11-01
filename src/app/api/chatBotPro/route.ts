import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    const token = await getToken({ req });
    
    if (!token?.email) {
        return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
      }

    try {
        const body = await req.json()
        const user_input = body.user_input

        const res = await fetch(`${process.env.BACKEND_API_URL}/chatbot/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input, email: token.email, tasks: body.tasks, processedContent: body.processedContent })
        })

        const data = await res.json()

        return NextResponse.json({ response: data.response, tasks: data.tasks, processedContent: data.processedContent })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
