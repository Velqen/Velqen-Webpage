import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const invoiceExtraction = process.env.BACKEND_API_URL;

    // ✅ Step 1: Wake the Flask server
    try {
      await fetch(`${invoiceExtraction}/doc-extraction/ping`);
      await new Promise(res => setTimeout(res, 3000)); // wait 3 seconds
    } catch (e) {
      console.warn("Flask wake-up failed:", e);
    }
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Create new FormData for backend request
    const backendFormData = new FormData()
    backendFormData.append('file', file)

    const response = await fetch(`${invoiceExtraction}/doc-extraction/`, {
      method: 'POST',
      body: backendFormData,
    })

    let data = null;

    try {
      data = await response.json(); // ✅ safely try to parse JSON
    } catch (err) {
      console.error('Failed to parse JSON from Flask:', err);
    }

    if (response.ok && data) {
      return NextResponse.json({ message: 'Upload successful', data });
    } else {
      return NextResponse.json(
        { error: data?.message || 'Flask server error or invalid response' },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
