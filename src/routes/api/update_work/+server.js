import db from '../../../database/db.js';

export async function POST({ request }) {
    const formData = await request.formData();
    const candidateId = formData.get('candidateId');
    const workRecords = JSON.parse(formData.get('workRecords'));
  
    if (!candidateId ||!workRecords) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400 }
      );
    }
  
    try {
      const query = `UPDATE work_history SET job_role =?, company =?, year_started =?, year_ended =? WHERE work_history_id =?`;
      const values = [
        workRecords[0].jobRole,
        workRecords[0].company,
        workRecords[0].yearStarted,
        workRecords[0].yearEnded,
        workRecords[0].work_history_id
      ];
  
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