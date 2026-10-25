import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleRequest(method: string, url: string) {
  try {
    // Get token from cookies
    const cookiesObj = await cookies();
    const token = cookiesObj.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    let response;

    switch (method) {
      case 'GET':
        response = await axios.get(url, { headers });
        break;

      case 'PUT':
        response = await axios.put(url, {}, { headers });
        break;

      case 'DELETE':
        response = await axios.delete(url, { headers });
        break;

      default:
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        );
    }

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const axiosErr = error as { response?: { data?: unknown; status?: number }; message?: string };
    console.error(`Error in ${method} request:`, axiosErr.response?.data || axiosErr.message);

    let errorMessage = 'An error occurred';
    switch (method) {
      case 'GET':
        errorMessage = 'Failed to fetch notifications';
        break;
      case 'PUT':
        errorMessage = 'Failed to mark all notifications as read';
        break;
      case 'DELETE':
        errorMessage = 'Failed to delete all notifications';
        break;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: axiosErr.response?.status || 500 }
    );
  }
}

// GET /api/notifications - Get user notifications
export function GET(request: Request) {
  // Parse query parameters
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const read = url.searchParams.get('read');
  const limit = url.searchParams.get('limit') || '50';
  const offset = url.searchParams.get('offset') || '0';

  // Build query parameters
  let queryParams = `?limit=${limit}&offset=${offset}`;
  if (type) queryParams += `&type=${type}`;
  if (read !== null) queryParams += `&read=${read}`;

  return handleRequest('GET', `${API_URL}/api/notifications${queryParams}`);
}

// DELETE /api/notifications - Delete all notifications
export function DELETE() {
  return handleRequest('DELETE', `${API_URL}/api/notifications`);
}

// PUT /api/notifications/read-all - Mark all notifications as read
export function PUT() {
  return handleRequest('PUT', `${API_URL}/api/notifications/read-all`);
} 