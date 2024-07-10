import db from '../../../database/db.js';

export async function GET({ url }) {
  const jobId = url.searchParams.get('jobId');

  if (jobId) {
    try {
      const query = `SELECT * FROM job WHERE job_id = ?`;
      const [result] = await db.execute(query, [jobId]);

      // Return specific job info
      return new Response(
        JSON.stringify(result[0]), // assuming only one result
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error(`Error getting job info: ${error}`);
      return new Response('Error getting job info', { status: 500 });
    }
  } else {
    try {
      const query = `SELECT * FROM job`;
      const [result] = await db.execute(query);

      // Return job list array
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
      console.error(`Error getting job list: ${error}`);
      return new Response('Error getting job list', { status: 500 });
    }
  }
}