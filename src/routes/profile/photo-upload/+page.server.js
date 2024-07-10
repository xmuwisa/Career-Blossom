import { writeFile, unlink, readdir } from 'node:fs/promises';
import { extname, join, basename, posix } from 'path';
import { redirect } from '@sveltejs/kit';

let userInfo = {};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params, fetch }) => {

        const response = await fetch('/api/get_user_info', { headers: request.headers });
        console.log('Response:', response);

        userInfo = await response.json();
        console.log('User info:', userInfo);
        
        if (!userInfo ||!userInfo.user_id) {
            return { success: false, error: 'Failed to fetch user info' };
        }

        const userId = userInfo.user_id;

        const formData = await request.formData();
        const uploadedFile = formData.get('file');
    
        if (uploadedFile && uploadedFile instanceof File) {
            const allowedExtensions = ['.jpg'];
            const fileExtension = extname(uploadedFile.name).toLowerCase();
      
            if (!allowedExtensions.includes(fileExtension)) {
              return { success: false, error: 'Only JPG files are allowed.' };
            }
      
            const filenameWithoutExtension = `${userId}`;
            const newFilename = `${filenameWithoutExtension}${fileExtension}`;
            const filePath = posix.join('static', 'uploads', newFilename);
      
            try {
              const oldFilePath = join(process.cwd(), 'static', 'uploads', `${filenameWithoutExtension}*`);
              const files = await readdir(join(process.cwd(), 'static', 'uploads'));
              const oldFiles = files.filter(file => file.startsWith(filenameWithoutExtension));
              await Promise.all(oldFiles.map(file => unlink(join(process.cwd(), 'static', 'uploads', file))));
            } catch (error) {
              console.error('Error deleting old files:', error);
            }
    
            await writeFile(filePath, Buffer.from(await uploadedFile.arrayBuffer()));
            console.log('File uploaded successfully. File path:', filePath);
    
            redirect(303, '/profile');
        }
    
        return { success: false, error: 'No file uploaded or invalid file type.' };
    }
};