import db from '../../../database/db.js';

export async function DELETE({ request, url }) {
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

  const appId = urlParams.get('appId');

  if (!appId) {
    return new Response('Application ID is required', { status: 400 });
  }

  try {
    const query = `
      DELETE FROM application
      WHERE application_id = ? AND candidate_id = ?
    `;
    await db.execute(query, [appId, candidateId]);

    return new Response('Application deleted successfully', { status: 200 });
  } catch (error) {
    console.error(`Error deleting application: ${error}`);
    return new Response('Error deleting application', { status: 500 });
  }
}