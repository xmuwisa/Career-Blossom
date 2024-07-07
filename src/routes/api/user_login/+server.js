import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import db from '../../../database/db.js';

export async function POST({ request }) {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  const selectQuery = `SELECT user_id, username, password FROM user WHERE username = ?`;

  try {
    const [rows] = await db.execute(selectQuery, [username]);
    
    if (rows.length === 0) {
      return new Response('Invalid username or password', { status: 401 });
    }

    const user = rows[0];
    const passwordHash = user.password;

    const passwordMatch = await compare(password, passwordHash);
    
    if (!passwordMatch) {
        return new Response('Invalid username or password', { status: 401 });
    }

    const userId = user.user_id;
    console.log(`User logged in successfully! User ID: ${userId}`);

    return new Response(
        JSON.stringify({ message: 'Logged in successfully', user_id: userId }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `userId=${userId}; Path=/; HttpOnly`
          }
        }
    );
    } catch (error) {
        console.error(`Error logging in: ${error}`);
        return new Response('An error occurred while logging in', { status: 500 });
    }
}
