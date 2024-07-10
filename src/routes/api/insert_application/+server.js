    import db from '../../../database/db.js';
    import { format } from 'date-fns';

    export async function POST({ request, url }) {
    try {
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

        // Check if candidateId is provided in the URL
        const urlParams = new URLSearchParams(url.search);
        const candidateIdFromUrl = urlParams.get('candidateId');

        // Use candidateId from URL if provided, otherwise use the one from the cookie
        candidateId = candidateIdFromUrl || candidateId;

        if (!candidateId) {
        return new Response(
            JSON.stringify({ success: false, message: 'Unauthorized' }),
            { status: 401 }
        );
        }

        const data = await request.json();
        const { jobId, employmentType } = data;
        
        const dateSubmitted = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        // Map employment types to enums
        const employmentTypeMap = {
        'Full-Time': 'FT',
        'Part-Time': 'PT',
        'Contract': 'C'
        };

        const employmentTypeEnum = employmentTypeMap[employmentType];

        if (!employmentTypeEnum) {
        return new Response(
            JSON.stringify({ success: false, message: 'Invalid employment type' }),
            { status: 400 }
        );
        }

        const query = `
        INSERT INTO application (date, application_status, employment_type, candidate_id, job_id)
        VALUES (?, 'P', ?, ?, ?)
        `;
        const values = [dateSubmitted, employmentTypeEnum, candidateId, jobId];

        const [result] = await db.execute(query, values);

        if (result.affectedRows > 0) {
        return new Response(
            JSON.stringify({ success: true }),
            { status: 201 }
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
