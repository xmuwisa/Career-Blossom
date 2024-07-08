export async function POST({ request }) {
  try {
    // Handle logout logic here
    // For example, clearing cookies or session data
    
    // Prepare response
    const responseBody = JSON.stringify({ message: 'User logged out successfully!' });
    return new Response(responseBody, {
      status: 200,
      headers: {
        'Set-Cookie': [
          `userId=; Path=/; HttpOnly; Max-Age=0`,
          `candidateId=; Path=/; HttpOnly; Max-Age=0`
        ],
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error logging out: ${error}`);
    return new Response('An error occurred while logging out', { status: 500 });
  }
}