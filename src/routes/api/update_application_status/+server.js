import db from '../../../database/db.js';

export async function PUT({ request }) {
  try {
    const { jobId, applicationId, status } = await request.json();

    // Input validation
    if (!jobId || !applicationId || !status) {
      return new Response('Invalid request body', { status: 400 });
    }

    const query = `
      UPDATE application
      SET application_status = ?
      WHERE job_id = ? AND application_id = ? AND application_status = ?
    `;
    const [result] = await db.execute(query, [status, jobId, applicationId, 'P']);

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Application status updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(`Error updating application status: ${error}`);
    return new Response('Error updating application status', { status: 500 });
  }
}
