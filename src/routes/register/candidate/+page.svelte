<script>
    import { Info, Asterisk, CaretDoubleRight } from "phosphor-svelte";
    import { goto } from '$app/navigation';
    
    let birthDate = '';
    let age = '';
    let sssNumber = '';
    let tinNumber = '';
    let pagIbigNumber = '';
    let philhealthNumber = '';
    let previewSrc = "";
    let fileName = "No file chosen";

    $: {
        if (birthDate) {
            let today = new Date();
            let birthDateObj = new Date(birthDate);
            let ageInYears = today.getFullYear() - birthDateObj.getFullYear();
            let m = today.getMonth() - birthDateObj.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
                ageInYears--;
            }
            age = ageInYears.toString();

            if (ageInYears < 13 || ageInYears > 100) {
                birthDate = '';
                age = '';
            }
        }
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        switch (target.placeholder) {
            case 'SSS Number':
                sssNumber = value;
                break;
            case 'TIN Number':
                tinNumber = value;
                break;
            case 'PAG-IBIG Number':
                pagIbigNumber = value;
                break;
            case 'PHILHEALTH Number':
                philhealthNumber = value;
                break;
        }

        const hasValue = [sssNumber, tinNumber, pagIbigNumber, philhealthNumber].some(Boolean);

        document.querySelectorAll('.id-input').forEach((input) => {
            input.required =!hasValue;
        });
    }

    function handleDateChange(event) {
        birthDate = event.target.value;
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                previewSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileName = "No file chosen";
            previewSrc = "";
        }
    }

</script>

<div class="w-full h-auto rounded-[35px] p-20 flex flex-col items-center justify-center">
    <div class="w-full flex flex-col items-center justify-center space-y-6 text-center">
        <div class="flex flex-col items-center justify-center">
            <img src="../src/lib/assets/career-blossom-logo.png" class="w-32" alt="Career Blossom Inc. Logo" />
            <span class="text-[#DA478D] font-serif font-extrabold italic text-4xl">Career Blossom Inc.</span>
        </div>
        <span class="text-[#353535] font-sans text-xl">Let's add the finishing touches to complete your profile.</span>
    </div>

    <div class="w-full mt-16 flex items-center justify-center">
        <form method="post" enctype="multipart/form-data" class="w-[525px] flex flex-col items-center justify-center">
            <div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D]">
                PERSONAL DETAILS
            </div>
            <div class="w-full flex items-center justify-between space-x-4 mt-6">
                <div class="relative w-full">
                    <input type="text" name="firstName" placeholder="First Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required />
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                <input type="text" name="middleName" placeholder="Middle Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
            </div>
            <div class="w-full flex items-center justify-between space-x-4 mt-6">
                <div class="relative w-full">
                    <input type="text" name="lastName" placeholder="Last Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                
                <input type="text" name="suffix" placeholder="Suffix" class="w-[20%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
            </div>
            <div class="relative w-full mt-6">
                <input type="text" name="address" placeholder="Address" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            
            <div class="w-full flex items-center justify-between space-x-4 mt-6">
                <div class="relative w-full">
                    <select name="sex" class="w-full p-4 rounded-[10px] text-gray-400" required>
                        <option disabled selected value="">Sex</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                <div class="relative w-full">
                    <select name="civilStatus" class="w-full p-4 rounded-[10px] text-gray-400" required>
                        <option disabled selected value="">Civil Status</option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Widowed</option>
                        <option>Divorced</option>
                    </select>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                <div class="relative w-full">
                    <input type="text" name="religion" placeholder="Religion" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
            </div>
            <div class="mt-6 relative w-full">
                <input type="text" name="birthPlace" placeholder="Birth Place" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"  required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <div class="w-full flex items-center justify-between space-x-4 mt-6">
                <div class="relative w-[75%]">
                    <input type="date" name="birthDate" placeholder="Birth date" class="w-full text-gray-400 rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required bind:value={birthDate} on:input={handleDateChange} />
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                <input type="number" placeholder="Age" class="w-[25%] bg-[#F8E0ED] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" value={age} readonly />
            </div>
            <div class="w-full flex items-center justify-between space-x-4 mt-6">
                <div class="relative w-[50%]">
                    <input type="text" name="height" placeholder="Height in cm" class="w-full text-gray-400 rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
                <div class="relative w-[50%]">
                    <input type="text" name="weight" placeholder="Weight in kg" class="w-full text-gray-400 rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                </div>
            </div>
            <div class="relative w-full mt-6">
                <input type="text" name="contactNumber" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>

            <div class="mt-12 w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                <span>IDENTIFICATION DETAILS</span>
                <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                    <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                    <div tabindex="0" class="dropdown-content">
                        <div class="bg-white w-[290px] rounded-[10px] shadow text-[14px] font-normal p-2">
                        Must provide at least one (1) of the following needed ID details.
                        </div>
                    </div>
                </div>
            </div>
            <input type="text" name="sssNumber" placeholder="SSS Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
            <input type="text" name="tinNumber" placeholder="TIN Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input"  equired on:input={handleInputChange}/>
            <input type="text" name="pagIbigNumber" placeholder="PAG-IBIG Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
            <input type="text" name="philHealthNumber" placeholder="PHILHEALTH Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>

            <div class="w-full flex items-center justify-start mt-12 font-semibold text-[#DA478D]">
                EMERGENCY DETAILS
            </div>
            <div class="mt-6 relative w-full">
                <input type="text" name="emergencyName" placeholder="Contact Person" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <div class="mt-6 relative w-full">
                <input type="text" name="emergencyContact" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>

            <div class="w-full flex mt-10 p-2 bg-[#F8E0ED] rounded-[12px] relative">
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                <div class="flex flex-col w-[70%]">
                    <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                        <span>PHOTO</span>
                        <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                            <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                            <div tabindex="0" class="dropdown-content">
                                <div class="bg-white w-[410px] rounded-[10px] shadow text-[14px] font-normal p-2">
                                    The photo must be JPG format, clearly show your face, and be a professional square photo.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center h-full">
                        <div class="flex flex-row items-center w-full bg-white rounded-[10px] hover:bg-[#FFF7F7] cursor-pointer">
                            <input type="file" name="file" id="custom-input" accept="image/jpg" hidden on:change={handleFileChange} required/>
                            <label for="custom-input" class="block text-gray-400 p-4 rounded-md border-0 bg-[#eecddf] min-w-[150px] cursor-pointer hover:bg-[#ddb2ca] hover:text-[#353535]">
                                Choose photo
                            </label>
                            <span class="ml-4 text-gray-500 truncate">{fileName}</span>
                        </div>
                    </div>
                </div>
                <div id="photo_review" class="flex w-[30%] bg-white h-[150px] ml-2 rounded-[8px]">
                    {#if previewSrc}
                        <img src={previewSrc} alt="Photo Preview" class="w-full h-full object-cover rounded-md" required/>
                    {/if}
                </div>
            </div>

            <div class="w-full flex mt-16 items-center justify-end">
                <button type="submit" class="text-[#353535] font-semibold w-[175px] py-3 bg-[#F4B8DA] rounded-[10px] opacity-90 hover:opacity-100 disabled:opacity-30 transition-all flex items-center justify-center">Proceed<span class="ml-1 mb-1"><CaretDoubleRight size={15} weight="bold" color="#353535"/></span></button>
            </div>
        </form>
    </div>
</div>