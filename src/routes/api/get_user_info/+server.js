import db from '../../../database/db.js';

export async function GET(event) {
  const request = event.request;
  console.log('Request:', request);

  const cookie = request.headers.get('Cookie');
  const userId = cookie && cookie.match(/userId=([^;]*)/)[1];

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const selectQuery = `SELECT user_id, username, email FROM user WHERE user_id =?`;

  try {
    const [rows] = await db.execute(selectQuery, [userId]);
    
    if (rows.length === 0) {
      return new Response('User not found', { status: 404 });
    }

    const userInfo = rows[0];
    return new Response(JSON.stringify(userInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error fetching user info: ${error}`);
    return new Response('An error occurred while fetching user info', { status: 500 });
  }
}