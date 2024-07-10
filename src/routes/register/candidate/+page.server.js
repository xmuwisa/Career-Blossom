import { writeFile, unlink, readdir } from 'node:fs/promises';
import { extname, join, basename, posix } from 'path';
import { redirect } from '@sveltejs/kit';

let userInfo = {};
let userInfoFetched = false;

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    if (userInfoFetched) return;

    try {
      const response = await fetch('/api/get_user_info', { headers: request.headers });
      console.log('Response:', response);

      if (response.ok) {
        userInfo = await response.json();
        console.log('User info:', userInfo);
        userInfoFetched = true;
      } else {
        console.error('Failed to fetch user info');
        userInfoFetched = false;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      userInfoFetched = false;
    }

    if (!userInfo || !userInfo.user_id) {
      return { success: false, error: 'Failed to fetch user info' };
    }

    const userId = userInfo.user_id;
    const formData = await request.formData();

    const first_name = formData.get('firstName');
    const last_name = formData.get('lastName');
    const middle_name = formData.get('middleName');
    const suffix = formData.get('suffix');
    const address = formData.get('address');
    const sex_enum = formData.get('sex');
    const civil_status_enum = formData.get('civilStatus');
    const religion = formData.get('religion');
    const birth_place = formData.get('birthPlace');
    const birth_date = formData.get('birthDate');
    const height = formData.get('height');
    const weight = formData.get('weight');
    const contact_number = formData.get('contactNumber');
    const sss_number = formData.get('sssNumber');
    const tin_number = formData.get('tinNumber');
    const pagibig_number = formData.get('pagIbigNumber');
    const philhealth_number = formData.get('philHealthNumber');
    const emergency_name = formData.get('emergencyName');
    const emergency_contact = formData.get('emergencyContact');

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

      try {
        await writeFile(filePath, Buffer.from(await uploadedFile.arrayBuffer()));
        console.log('File uploaded successfully. File path:', filePath);

        const candidateData = {
          firstName: first_name,
          middleName: middle_name,
          lastName: last_name,
          suffix: suffix,
          address: address,
          sex: sex_enum,
          civilStatus: civil_status_enum,
          religion: religion,
          birthPlace: birth_place,
          birthDate: birth_date,
          height: height,
          weight: weight,
          contactNumber: contact_number,
          sssNumber: sss_number,
          tinNumber: tin_number,
          pagIbigNumber: pagibig_number,
          philhealthNumber: philhealth_number,
          emergencyName: emergency_name,
          emergencyContact: emergency_contact,
          userId: userId,
          filePath: filePath
        };

        const response = await fetch('/api/insert_candidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(candidateData)
        });

        if (!response.ok) {
          console.error('Error creating candidate');
          return { success: false, error: 'Error creating candidate' };
        }

        const result = await response.json();
        console.log(`Candidate inserted successfully! Candidate ID: ${result.candidate_id}`);
      } catch (error) {
        console.error('Error creating candidate:', error);
        return { success: false, error: 'Error creating candidate' };
      } finally {
        redirect(303, '/register/candidate/education');
      }
    }
  }
};