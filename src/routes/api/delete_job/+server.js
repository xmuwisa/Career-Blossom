import db from '../../../database/db.js';

export async function DELETE({ request }) {
    const data = await request.json();
    const { jobId } = data;
  
    try {
      const query = `DELETE FROM job WHERE job_id = ?`;
      const values = [jobId];
  
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