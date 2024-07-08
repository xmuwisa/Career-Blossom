import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import db from '../../../database/db.js';

export async function POST({ request }) {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  const selectUserQuery = `SELECT user_id, username, password FROM user WHERE username = ?`;
  const selectCandidateQuery = `SELECT candidate_id FROM candidate WHERE user_id = ?`;

  try {
    const [userRows] = await db.execute(selectUserQuery, [username]);

    if (userRows.length === 0) {
      return new Response('Invalid username or password', { status: 401 });
    }

    const user = userRows[0];
    const passwordHash = user.password;

    const passwordMatch = await compare(password, passwordHash);

    if (!passwordMatch) {
      return new Response('Invalid username or password', { status: 401 });
    }

    const userId = user.user_id;

    // Fetch the candidate ID using the user ID
    const [candidateRows] = await db.execute(selectCandidateQuery, [userId]);

    if (candidateRows.length === 0) {
      return new Response('Candidate not found for the user', { status: 404 });
    }

    const candidateId = candidateRows[0].candidate_id;

    const responseBody = JSON.stringify({ message: 'User logged in successfully!', user_id: userId, candidate_id: candidateId });
    return new Response(responseBody, {
      status: 201,
      headers: {
        'Set-Cookie': [
          `userId=${userId}; Path=/; HttpOnly; Max-Age=31536000`,
          `candidateId=${candidateId}; Path=/; HttpOnly; Max-Age=31536000`
        ],
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(`Error logging in: ${error}`);
    return new Response('An error occurred while logging in', { status: 500 });
  }
}

