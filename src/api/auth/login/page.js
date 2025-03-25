// app/api/auth/login/route.js

export async function POST(req) {
  console.log('POST request received');
  try {
    // Parse the JSON body using the `json()` method of the request
    const { email, password } = await req.json();  // `req.json()` is used to parse the request body

    // Perform your authentication logic here (for example, using credentials)
    // Example: Call a sign-in function with the credentials
    await signIn('credentials', { email, password });

    // Send a response back to the client
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }
}