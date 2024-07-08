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

  // Check if candidateId is provided in the URL
  const urlParams = new URLSearchParams(url.search);
  const candidateIdFromUrl = urlParams.get('candidateId');

  // Use candidateId from URL if provided, otherwise use the one from the cookie
  candidateId = candidateIdFromUrl || candidateId;

  if (!candidateId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Get the applications submitted by the candidate
    const query = `SELECT * FROM application WHERE candidate_id = ?`;
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