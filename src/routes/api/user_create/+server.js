import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import db from '../../../database/db.js';

export async function POST({ request }) {
  const data = await request.formData();
  const username = data.get('username');
  const email = data.get('email');
  const password = data.get('password');

  const hashedPassword = await hash(password, 10);

  const insertQuery = `INSERT INTO user (username, email, password) VALUES (?,?,?)`;
  const values = [username, email, hashedPassword];

  try {
    await db.execute(insertQuery, values);
    
    const [result] = await db.execute('SELECT LAST_INSERT_ID() AS user_id');
    const userId = result[0].user_id;

    console.log(`User inserted successfully! User ID: ${userId}`);
    return new Response(JSON.stringify({ message: 'User created successfully', user_id: userId }), { status: 201 });
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return new Response('Error creating user', { status: 500 });
  }
}
