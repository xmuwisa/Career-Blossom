<script>
    import WorkHistory from './workHistoryDetails.svelte';
    import EducationHistory from './educHistoryDetails.svelte';

    // import { writeFile, unlink, readdir } from 'node:fs/promises';
    // import { extname, join, basename } from 'path';

    // /** @type {import('./$types').Actions} */
    // export const actions = {
    //     default: async ({ request, params }) => {
    //         const formData = await request.formData();
    //         const uploadedFile = formData.get('file');

    //         if (uploadedFile && uploadedFile instanceof File) {
    //         const allowedExtensions = ['.jpg', '.png'];
    //         const fileExtension = extname(uploadedFile.name).toLowerCase();

    //         if (!allowedExtensions.includes(fileExtension)) {
    //             return { success: false, error: 'Only JPG and PNG files are allowed.' };
    //         }

    //         const filenameWithoutExtension = `${candidateId}`;
    //         const newFilename = `${filenameWithoutExtension}${fileExtension}`;
    //         const filePath = join(process.cwd(), `uploads/${newFilename}`);

    //         try {
    //             const oldFilePath = join(process.cwd(), `uploads/${filenameWithoutExtension}*`);
    //             const files = await readdir(join(process.cwd(), 'uploads'));
    //             const oldFiles = files.filter(file => file.startsWith(filenameWithoutExtension));
    //             await Promise.all(oldFiles.map(file => unlink(join(process.cwd(), `uploads/${file}`))));
    //         } catch (error) {
    //         }

    //         await writeFile(filePath, Buffer.from(await uploadedFile.arrayBuffer()));

    //         return { success: true };
    //         }

    //         return { success: false, error: 'No file uploaded or invalid file type.' };
    //     }
    // };
</script>

<div class="w-[35%] mt-16 flex items-center justify-center">
    <form method="post" enctype="multipart/form-data" class="w-[525px] flex flex-col items-center justify-center">
        <div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D]">
            PERSONAL DETAILS
        </div>
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <input type="text" placeholder="First Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
            <input type="text" placeholder="Middle Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        </div>
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <input type="text" placeholder="Last Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
            <input type="text" placeholder="Suffix" class="w-[20%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        </div>
        <input type="text" placeholder="Address" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <select class="w-full p-4 rounded-[10px] text-gray-400">
                <option disabled selected>Sex</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            <select class="w-full p-4 rounded-[10px] text-gray-400">
                <option disabled selected>Civil Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Divorced</option>
            </select>
            <input type="text" placeholder="Religion" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        </div>
        <input type="text" placeholder="Birth Place" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <input type="date" placeholder="Birth date" class="w-[75%] text-gray-400 rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
            <input type="number" placeholder="Age" class="w-[25%] bg-[#F8E0ED] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" disabled/>
        </div>
        <input type="text" placeholder="Contact Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />

        <div class="w-full flex items-center justify-start mt-12 font-semibold text-[#DA478D]">
            IDENTIFICATION DETAILS
        </div>
        <input type="text" placeholder="SSS Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <input type="text" placeholder="TIN Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <input type="text" placeholder="PAG-IBIG Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <input type="text" placeholder="PHILHEALTH Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />

        <EducationHistory />

        <WorkHistory />

        <div class="w-full flex items-center justify-start mt-12 font-semibold text-[#DA478D]">
            EMERGENCY DETAILS
        </div>
        <input type="text" placeholder="Contact Person" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        <input type="text" placeholder="Contact Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />

        <div class="w-full flex mt-12">
            <div class="flex flex-col w-[70%]">
                <div class="w-full flex items-center justify-start font-semibold text-[#DA478D]">
                    PHOTO
                </div>
                <div class="flex flex-col items-center justify-center h-full">
                    <div class="flex flex-row items-center w-full bg-white rounded-[10px] hover:bg-[#FFF7F7] cursor-pointer">
                        <input type="file" id="custom-input" accept="image/jpeg, image/png" hidden/>
                        <label for="custom-input" class="block text-gray-400 p-4 rounded-md border-0 bg-[#F8E0ED] cursor-pointer hover:bg-[#eecddf]">Choose file</label>
                    </div>
                </div>
            </div>
            <div class="flex w-[30%] bg-white h-[150px] ml-4">
    
            </div>
        </div>
        
        
        

        <div class="flex items-center justify-center space-x-2 text-[14px] mt-16 ">
            <input type="checkbox" id="agreement" name="agreement">
            <label for="agreement">I agree to the <button class="font-semibold">terms and conditions</button>.</label>
        </div>
        
        <button class="mt-3 text-[#353535] font-semibold w-[225px] py-3 bg-[#F4B8DA] rounded-[50px]">Sign Up</button>
    </form>
</div>
