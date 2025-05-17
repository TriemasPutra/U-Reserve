import { logout } from "@/auth/logout";

export async function POST() {
    return new Response('Method not allowed', { status: 405 });
}

export async function GET() {
    const response = await logout();
    if (!response.success) { 
        return new Response(JSON.stringify({ success: false, message: response.message }), { status: 401 });
    }
    return new Response(JSON.stringify({ success: true, message: 'Logout successful' }), { status: 200 });
}