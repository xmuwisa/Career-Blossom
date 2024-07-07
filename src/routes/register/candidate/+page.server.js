import { writeFile, unlink, readdir } from 'node:fs/promises';
import { extname, join, basename } from 'path';

let candidateId = 2;

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();
    const uploadedFile = formData.get('file');

    if (uploadedFile && uploadedFile instanceof File) {
      const allowedExtensions = ['.jpg'];
      const fileExtension = extname(uploadedFile.name).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return { success: false, error: 'Only JPG and PNG files are allowed.' };
      }

      const filenameWithoutExtension = `${candidateId}`;
      const newFilename = `${filenameWithoutExtension}${fileExtension}`;
      const filePath = join(process.cwd(), `uploads/${newFilename}`);

      try {
        const oldFilePath = join(process.cwd(), `uploads/${filenameWithoutExtension}*`);
        const files = await readdir(join(process.cwd(), 'uploads'));
        const oldFiles = files.filter(file => file.startsWith(filenameWithoutExtension));
        await Promise.all(oldFiles.map(file => unlink(join(process.cwd(), `uploads/${file}`))));
      } catch (error) {
      }

      await writeFile(filePath, Buffer.from(await uploadedFile.arrayBuffer()));

      return { success: true };
    }

    return { success: false, error: 'No file uploaded or invalid file type.' };
  }
};