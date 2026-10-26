import { NextRequest, NextResponse } from 'next/server';

// Get backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Backend URL:', BACKEND_URL);
    console.log('Attempting to connect to backend:', `${BACKEND_URL}/contact/career-application`);

    const response = await fetch(`${BACKEND_URL}/contact/career-application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend response error:', response.status, errorText);
      let errorMessage = 'Falha ao enviar a candidatura. Verifique os dados informados e tente novamente.';
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.details && Array.isArray(errorJson.details)) {
          errorMessage = errorJson.details.map((e: any) => e.msg || e.message).filter(Boolean).join(', ') || errorJson.message || 'Falha na validação';
        } else if (errorJson.errors && Array.isArray(errorJson.errors)) {
          errorMessage = errorJson.errors.map((e: any) => e.msg || e.message).filter(Boolean).join(', ') || errorJson.message || 'Falha na validação';
        } else if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        // Ignore JSON parse errors here, fallback to default message
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Career application proxy error:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
        success: false,
        debug: {
          backendUrl: BACKEND_URL,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        }
      },
      { status: 500 }
    );
  }
}
