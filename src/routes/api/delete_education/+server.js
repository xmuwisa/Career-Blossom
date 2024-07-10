import db from '../../../database/db.js';

export async function DELETE({ url }) {
    const id = url.searchParams.get('id');
  
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing id parameter' }),
        { status: 400 }
      );
    }
  
    try {
      const query = `DELETE FROM education_history WHERE education_history_id =?`;
      const values = [id];
  
      const [result] = await db.execute(query, values);
  
      if (result.affectedRows > 0) {
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200 }
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