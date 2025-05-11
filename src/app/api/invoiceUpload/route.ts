import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
    console.log('🔧 ENV INVOICE_EXTRACTION_BACKEND:', process.env.INVOICE_EXTRACTION_BACKEND);

  // Send the file directly to the Flask API
  const invoiceExtraction = process.env.INVOICE_EXTRACTION_BACKEND; // ✅ new line
  const response = await fetch(`${invoiceExtraction}/process-invoice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/pdf', // Adjust based on your server's expectations
    },
    body: buffer, // Send the fileBuffer directly to the Flask server
  })

  const data = await response.json()

  // Check if the file was processed successfully
  if (response.ok) {
    return NextResponse.json({ message: 'Upload successful', data })
  } else {
    return NextResponse.json({ error: data.message || 'Error sending to Flask API' }, { status: 500 })
  }
}
