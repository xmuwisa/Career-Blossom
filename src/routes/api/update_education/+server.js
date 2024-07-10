import db from '../../../database/db.js';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const candidateId = formData.get('candidateId');
    const educRecordsString = formData.get('educationRecords');
    const educRecords = JSON.parse(educRecordsString);

    console.log('Received formData:', formData);
    console.log('Candidate ID:', candidateId);
    console.log('Education Records:', educRecords);

    if (!candidateId || !educRecords) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const query = `UPDATE education_history SET school_name =?, degree_type =?, year_started =?, year_ended =? WHERE education_history_id =?`;
    const values = [
      educRecords[0].schoolName,
      educRecords[0].degreeType,
      educRecords[0].yearStarted,
      educRecords[0].yearEnded,
      educRecords[0].education_history_id
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
