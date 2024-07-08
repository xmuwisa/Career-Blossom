// Import your database connection
import db from '../../../database/db.js';

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const candidateId = formData.get('candidateId');
        const workRecords = JSON.parse(formData.get('workRecords'));

        if (!candidateId || !Array.isArray(workRecords)) {
            return new Response('Invalid request format', { status: 400 });
        }

        const insertQuery = `
            INSERT INTO work_history (candidate_id, job_role, company, year_started, year_ended)
            VALUES (?, ?, ?, ?, ?)
        `;

        const promises = workRecords.map(record => {
            const values = [
                candidateId,
                record.jobRole,
                record.company,
                record.yearStarted,
                record.yearEnded || null // Handle null yearEnded
            ];
            return db.execute(insertQuery, values);
        });

        await Promise.all(promises);
        console.log(`Work records inserted successfully for candidate ${candidateId}`);
        return new Response(JSON.stringify({ message: 'Work records inserted successfully' }), { status: 201 });
    } catch (error) {
        console.error(`Error inserting work records: ${error}`);
        return new Response('Error inserting work records', { status: 500 });
    }
}
