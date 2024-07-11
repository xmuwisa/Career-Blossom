import db from '../../../database/db.js';

export async function GET({ url }) {
  try {
    const queries = [
      `SELECT COUNT(*) AS total_applications FROM application`,

      `SELECT employment_type, COUNT(*) AS emp_count
       FROM application
       GROUP BY employment_type`,

      `SELECT application_status, COUNT(*) AS app_count
       FROM application
       GROUP BY application_status`,

      `SELECT j.job_role, COUNT(*) AS count
       FROM application AS a, job AS j
       WHERE a.job_id = j.job_id
       GROUP BY j.job_role
       LIMIT 5`,

      `SELECT ROUND(AVG(applications_per_candidate)) AS avg_applications
      FROM (
        SELECT c.candidate_id, COUNT(*) AS applications_per_candidate
        FROM application AS a, candidate AS c
        WHERE a.candidate_id = c.candidate_id
        GROUP BY c.candidate_id
      ) AS subquery`
    ];

    const results = await Promise.all(queries.map((query) => db.execute(query)));

    const statistics = {
      totalApplications: results[0][0][0].total_applications,
      employmentTypeStats: results[1][0],
      applicationStatusStats: results[2][0],
      topJobs: results[3][0],
      avgApplicationsPerCandidate: results[4][0][0].avg_applications
    };

    return new Response(
      JSON.stringify(statistics),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error(`Error getting statistics: ${error}`);
    return new Response('Error getting statistics', { status: 500 });
  }
}
