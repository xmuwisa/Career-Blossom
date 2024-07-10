import { json } from '@sveltejs/kit';
import db from '../../../database/db.js';

export async function POST({ request, resolve }) {
    const cookie = request.headers.get('Cookie');
    console.log('Cookie:', cookie);

    const userIdMatch = cookie && cookie.match(/userId=([^;]*)/);
    const candidateIdMatch = cookie && cookie.match(/candidateId=([^;]*)/);

    let userId;
    let candidateId;

    if (userIdMatch) {
        userId = userIdMatch[1];
    } else {
        userId = null;
    }

    if (candidateIdMatch) {
        candidateId = candidateIdMatch[1];
    } else {
        candidateId = null;
    }

    if (!candidateId) {
        return json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Get the updated candidate data from the request body
    const updatedCandidateData = await request.json();

    // Update the candidate row in the database
    try {
        const [results, fields] = await db.execute(`
            UPDATE candidate SET 
            first_name = ?, 
            middle_name = ?, 
            last_name = ?, 
            suffix = ?, 
            address = ?, 
            sex = ?, 
            civil_status = ?, 
            religion = ?, 
            birth_place = ?, 
            birth_date = ?, 
            height = ?, 
            weight = ?, 
            contact_number = ?, 
            sss_number = ?, 
            tin_number = ?, 
            pagibig_number = ?, 
            philhealth_number = ?, 
            emergency_name = ?, 
            emergency_contact = ?
            WHERE candidate_id = ?
        `, [
            updatedCandidateData.firstName, 
            updatedCandidateData.middleName || null, 
            updatedCandidateData.lastName, 
            updatedCandidateData.suffix || null, 
            updatedCandidateData.address, 
            updatedCandidateData.sex, 
            updatedCandidateData.civilStatus, 
            updatedCandidateData.religion, 
            updatedCandidateData.birthPlace, 
            updatedCandidateData.birthDate, 
            updatedCandidateData.height, 
            updatedCandidateData.weight, 
            updatedCandidateData.contactNumber, 
            updatedCandidateData.sssNumber || null, 
            updatedCandidateData.tinNumber || null, 
            updatedCandidateData.pagIbigNumber || null, 
            updatedCandidateData.philHealthNumber || null, 
            updatedCandidateData.emergencyName, 
            updatedCandidateData.emergencyContact, 
            candidateId
        ]);

        return json({ success: true, message: 'Candidate updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating candidate:', error);
        return json({ success: false, message: 'Error updating candidate' }, { status: 500 });
    }
}
