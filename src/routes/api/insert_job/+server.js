import db from '../../../database/db.js';

export async function POST({ request }) {
  const data = await request.json();
  const { jobId, jobRole, status, description } = data;

  try {
    let query;
    let values;

    if (jobId) {
      // Update existing job
      query = `
        UPDATE job
        SET job_role = ?, status = ?, description = ?
        WHERE job_id = ?
      `;
      values = [jobRole, status, description, jobId];
    } else {
      // Insert new job
      query = `
        INSERT INTO job (job_role, status, description)
        VALUES (?, ?, ?)
      `;
      values = [jobRole, status, description];
    }

    const [result] = await db.execute(query, values);

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'No rows affected' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Database operation failed:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database operation failed' }),
      { status: 500 }
    );
  }
}
