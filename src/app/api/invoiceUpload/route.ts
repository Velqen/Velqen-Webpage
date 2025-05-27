import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const invoiceExtraction = process.env.INVOICE_EXTRACTION_BACKEND;
    const response = await fetch(`${invoiceExtraction}/process-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: buffer,
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
