import db from '../../../database/db.js';

export async function GET({ url }) {
  try {
    const query = `
      SELECT *
      FROM application AS a, candidate AS c, job AS j, user as u
      WHERE a.candidate_id = c.candidate_id AND a.job_id = j.job_id AND c.user_id = u.user_id
    `;
    const [result] = await db.execute(query);

    // Return application list with joined candidate and job info
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
    console.error(`Error getting application list: ${error}`);
    return new Response('Error getting application list', { status: 500 });
  }
}