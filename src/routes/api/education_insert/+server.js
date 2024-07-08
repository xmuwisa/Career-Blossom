import db from '../../../database/db.js';

export async function POST({ request }) {
    const formData = await request.formData();
    const candidateId = formData.get('candidateId');
    const educationRecords = JSON.parse(formData.get('educationRecords'));

    if (!candidateId || !educationRecords.length) {
        return new Response('Missing required fields', { status: 400 });
    }

    const insertQuery = `
        INSERT INTO education_history (candidate_id, school_name, degree_type, year_started, year_ended)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
        const promises = educationRecords.map((record) => {
            const values = [
                candidateId,
                record.schoolName,
                record.degreeType,
                record.yearStarted,
                record.yearEnded ? record.yearEnded : null, // handle null yearEnded
            ];
            return db.execute(insertQuery, values);
        });

        await Promise.all(promises);
        console.log(`Education records inserted successfully for candidate ${candidateId}`);
        return new Response(JSON.stringify({ message: 'Education records inserted successfully' }), { status: 201 });
    } catch (error) {
        console.error(`Error inserting education records: ${error}`);
        return new Response('Error inserting education records', { status: 500 });
    }
}
