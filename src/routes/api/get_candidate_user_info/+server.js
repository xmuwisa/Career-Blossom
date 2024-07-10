import db from '../../../database/db.js';

export async function GET({ request, url }) {
  const cookie = request.headers.get('Cookie');
  console.log('Cookie:', cookie);

  const userIdMatch = cookie && cookie.match(/userId=([^;]*)/);
  const candidateIdMatch = cookie && cookie.match(/candidateId=([^;]*)/);

  let userId;
  let candidateId;

  if (userIdMatch) {
    userId = userIdMatch[1];
  } else {
    userId = null;
  }

  if (candidateIdMatch) {
    candidateId = candidateIdMatch[1];
  } else {
    candidateId = null;
  }

  const urlParams = new URLSearchParams(url.search);
  const candidateIdFromUrl = urlParams.get('candidateId');

  candidateId = candidateIdFromUrl || candidateId;

  if (!candidateId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const query = `SELECT *, username, email, role FROM candidate AS c, user AS u WHERE candidate_id =? AND c.user_id = u.user_id`;
    const [result] = await db.execute(query, [candidateId]);

    if (result.length === 0) {
      return new Response('Candidate not found', { status: 404 });
    }

    const candidateInfo = result[0];
    return new Response(
      JSON.stringify(candidateInfo),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(`Error getting candidate info: ${error}`);
    return new Response('Error getting candidate info', { status: 500 });
  }
}