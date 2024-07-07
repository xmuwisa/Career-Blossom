import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  console.log('Request:', request);
  try {
    console.log('Logging out...');

    const userIdCookie = cookies.get('userId');
    if (!userIdCookie) {
      console.log('Not logged in');
      return json({ message: 'Not logged in' }, 401);
    }

    console.log('Deleting userId cookie...');
    cookies.delete('userId', { path: '/' });

    console.log('Logged out successfully');
    return json({ message: 'Logged out successfully' }, 200);
  } catch (error) {
    console.error('Error logging out:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return json({ message: 'An error occurred while logging out' }, 500);
  }
}