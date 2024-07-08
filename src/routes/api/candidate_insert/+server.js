import db from '../../../database/db.js';

export async function POST({ request }) {
  const data = await request.json();

  const {
    firstName,
    middleName,
    lastName,
    suffix,
    address,
    sex,
    civilStatus,
    religion,
    birthPlace,
    birthDate,
    height,
    weight,
    contactNumber,
    sssNumber,
    tinNumber,
    pagIbigNumber,
    philhealthNumber,
    emergencyName,
    emergencyContact,
    userId,
    filePath
  } = data;

  // Map select inputs to database enums
  const sexEnum = sex === 'Male' ? 'M' : 'F';
  const civilStatusEnum =
    civilStatus === 'Single' ? 'S' :
    civilStatus === 'Married' ? 'M' :
    civilStatus === 'Widowed' ? 'W' :
    civilStatus === 'Divorced' ? 'D' :
    null;

  // Prepare query and values for insertion
  const insertQuery = `
    INSERT INTO candidate (
      first_name, middle_name, last_name, suffix, address, sex, civil_status,
      religion, birth_place, birth_date, height, weight, contact_number,
      sss_number, tin_number, pagibig_number, philhealth_number,
      emergency_name, emergency_contact, user_id, photo_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstName || null,
    middleName || null,
    lastName || null,
    suffix || null,
    address || null,
    sexEnum,
    civilStatusEnum,
    religion || null,
    birthPlace || null,
    birthDate || null,
    height || null,
    weight || null,
    contactNumber || null,
    sssNumber || null,
    tinNumber || null,
    pagIbigNumber || null,
    philhealthNumber || null,
    emergencyName || null,
    emergencyContact || null,
    userId || null,
    filePath || null
  ];

  try {
    const [result] = await db.execute(insertQuery, values);
    const candidateId = result.insertId;

    console.log(`Candidate inserted successfully! Candidate ID: ${candidateId}`);
    return new Response(
        JSON.stringify({ message: 'Candidate created successfully', candidate_id: candidateId }),
        {
          status: 201,
          headers: {
            'Set-Cookie': [
                `userId=${userId}; Path=/; HttpOnly`,
                `candidateId=${candidateId}; Path=/; HttpOnly`
                ]
            }
        }
    );
    } catch (error) {
        console.error(`Error creating candidate: ${error}`);
        return new Response('Error creating candidate', { status: 500 });
    }
}