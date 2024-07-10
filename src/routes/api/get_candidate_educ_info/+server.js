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
    const query = `SELECT * FROM education_history WHERE candidate_id = ?`;
    const [result] = await db.execute(query, [candidateId]);

    if (result.length === 0) {
      return new Response('Candidate not found', { status: 404 });
    }

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(`Error getting candidate education info: ${error}`);
    return new Response('Error getting candidate education info', { status: 500 });
  }
}