import db from '../../../database/db.js';

export async function GET() {
  try {
    const query = `
      SELECT job_id, COUNT(*) AS total_pendings
      FROM application
      WHERE application_status = 'P'
      GROUP BY job_id
    `;
    const [result] = await db.execute(query);

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
    console.error(`Error getting total pendings: ${error}`);
    return new Response('Error getting total pendings', { status: 500 });
  }
}
