import { login } from '@/auth/login'
import { redirect } from 'next/dist/server/api-utils';

export async function POST(request) {
  console.log('\nPOST /api/login\n');
  const body = await request.json();
  const response = await login(body);
  if (response.status === 401) {
    return new Response(JSON.stringify({ success: false, message: response.message }), { status: 401 });
  }
  return new Response(JSON.stringify({ success: true, message: 'Login successful', redirectUrl: response.redirectUrl }), { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), { status: 405 });
}