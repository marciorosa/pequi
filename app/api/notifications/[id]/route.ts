import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define a function that handles all routes to avoid type errors
async function handleRequest(method: string, id: string) {
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

    // Handle different HTTP methods
    switch (method) {
      case 'GET':
        response = await axios.get(
          `${API_URL}/api/notifications/${id}`,
          { headers }
        );
        break;

      case 'PUT':
        response = await axios.put(
          `${API_URL}/api/notifications/${id}/read`,
          {},
          { headers }
        );
        break;

      case 'DELETE':
        response = await axios.delete(
          `${API_URL}/api/notifications/${id}`,
          { headers }
        );
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
        errorMessage = 'Failed to fetch notification';
        break;
      case 'PUT':
        errorMessage = 'Failed to mark notification as read';
        break;
      case 'DELETE':
        errorMessage = 'Failed to delete notification';
        break;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: axiosErr.response?.status || 500 }
    );
  }
}

// GET /api/notifications/:id - Get a specific notification
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleRequest('GET', id);
}

// PUT /api/notifications/:id/read - Mark a notification as read
export async function PUT(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleRequest('PUT', id);
}

// DELETE /api/notifications/:id - Delete a notification
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleRequest('DELETE', id);
} 