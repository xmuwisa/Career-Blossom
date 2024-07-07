<!-- <script>
    import TCPP from './tcpp.svelte';
    import { X, Plus, Info, Asterisk } from "phosphor-svelte";
    import { onMount, afterUpdate } from 'svelte';
    import { writable } from 'svelte/store';
    import { registrationData } from '$lib/store';
    

    let storedData = {};
    registrationData.subscribe(value => {
        storedData = value;
        console.log('Stored Registration Data:', storedData);
    });

    let previewSrc = "";
    let fileName = "No file chosen";
    let inputsEduc = writable([{ id: 1 }]);
    let inputsWork = writable([]);
    let birthDate = '';
    let age = '';
    let sssNumber = '';
    let tinNumber = '';
    let pagIbigNumber = '';
    let philhealthNumber = '';

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
            input.required = !hasValue;
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

    function handleSubmit() {
    //     if(){

    //     } else {
    //         registrationData.set({});
    //     }
    }

    function addInputsEduc(event) {
        event.preventDefault();
        inputsEduc.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId }];
        });
        scrollToAddInput1();
    }

    function removeInputsEduc(id) {
        inputsEduc.update(arr => {
            return arr.filter(input => input.id !== id);
        });
    }

    function addInputsWork(event) {
        event.preventDefault();
        inputsWork.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId }];
        });
        scrollToAddInput2();
    }

    function removeInputsWork(id) {
        inputsWork.update(arr => {
            return arr.filter(input => input.id !== id);
        });
    }

    function initializeInputs(inputStore) {
        inputStore.update(arr => {
            if (arr.length === 0) {
                return [{ id: 1 }];
            }
            return arr;
        });
    }

    onMount(() => {
        initializeInputs(inputsEduc);
    });

    afterUpdate(() => {
        scrollToAddInput1();
        scrollToAddInput2();
    });

    function scrollToAddInput1() {
        const scrollContainer1 = document.getElementById('inputContainerEduc');
        if (scrollContainer1) {
            scrollContainer1.scrollTop = scrollContainer1.scrollHeight;
        }
    }

    function scrollToAddInput2() {
        const scrollContainer2 = document.getElementById('inputContainerWork');
        if (scrollContainer2) {
            scrollContainer2.scrollTop = scrollContainer2.scrollHeight;
        }
    }

    
</script>

<div class="w-[35%] mt-16 flex items-center justify-center">
    <form method="post" enctype="multipart/form-data" class="w-[525px] flex flex-col items-center justify-center" on:submit={handleSubmit}>
        <div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D]">
            PERSONAL DETAILS
        </div>
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <div class="relative w-full">
                <input type="text" placeholder="First Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required />
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <input type="text" placeholder="Middle Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        </div>
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <div class="relative w-full">
                <input type="text" placeholder="Last Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            
            <input type="text" placeholder="Suffix" class="w-[20%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
        </div>
        <div class="relative w-full mt-6">
            <input type="text" placeholder="Address" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <div class="relative w-full">
                <select class="w-full p-4 rounded-[10px] text-gray-400" required>
                    <option disabled selected value="">Sex</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <div class="relative w-full">
                <select class="w-full p-4 rounded-[10px] text-gray-400" required>
                    <option disabled selected value="">Civil Status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                    <option>Divorced</option>
                </select>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <div class="relative w-full">
                <input type="text" placeholder="Religion" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
        </div>
        <div class="mt-6 relative w-full">
            <input type="text" placeholder="Birth Place" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="w-full flex items-center justify-between space-x-4 mt-6">
            <div class="relative w-[75%]">
                <input type="date" placeholder="Birth date" class="w-full text-gray-400 rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required bind:value={birthDate} on:input={handleDateChange} />
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <input type="number" placeholder="Age" class="w-[25%] bg-[#F8E0ED] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" value={age} readonly />
        </div>
        <div class="relative w-full mt-6">
            <input type="text" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
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
        <input type="text" placeholder="SSS Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
        <input type="text" placeholder="TIN Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
        <input type="text" placeholder="PAG-IBIG Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
        <input type="text" placeholder="PHILHEALTH Number" class="mt-6 w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>

        <div class="flex items-center justify-between mt-12 w-[525px]">
            <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                <span>EDUCATION HISTORY DETAILS</span>
                <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                    <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                    <div tabindex="0" class="dropdown-content">
                        <div class="bg-white w-[250px] rounded-[10px] shadow text-[14px] font-normal p-2">
                            Must provide at least one (1) educational background.
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" on:click={addInputsEduc} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
        </div>
        <div id="inputContainerEduc" class="w-[575px] flex flex-col items-center justify-center overflow-auto">
            {#each $inputsEduc as inputEduc (inputEduc.id)}
                <div class="p-2 mt-6 rounded-[12px] bg-[#F8E0ED] w-[525px] relative">
                    {#if inputEduc.id !== 1}
                        <button type="button" on:click={() => removeInputsEduc(inputEduc.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-4 -top-4"><X size={10} weight="bold" /></button>
                    {/if}
                    <div class="relative w-full">
                        <input type="text" placeholder="School Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                    </div>
                    
                    <div class="w-full flex items-center justify-between space-x-2 mt-3">
                        <div class="relative w-[45%]">
                            <select class="w-full p-4 rounded-[10px] text-gray-400" required>
                                <option disabled selected value="">Degree</option>
                                <option>High School</option>
                                <option>Associate</option>
                                <option>Bachelor</option>
                                <option>Master</option>
                                <option>PhD</option>
                                <option>Doctorate</option>
                                <option>Certificate</option>
                                <option>Other</option>
                              </select>
                              <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        <div class="relative w-[27%]">
                            <input type="text" placeholder="Year Started" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                            <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        
                        <input type="text" placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
                    </div>
                </div>
            {/each}
        </div>

        <div class="flex items-center justify-between mt-12 w-[525px]">
            <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                <span>WORK HISTORY DETAILS</span>
                <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                    <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                    <div tabindex="0" class="dropdown-content">
                        <div class="bg-white w-[293px] rounded-[10px] shadow text-[14px] font-normal p-2">
                            Add a work background if there is any.
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" on:click={addInputsWork} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
        </div>
        
        <div id="inputContainerWork" class="w-[575px] flex flex-col items-center justify-center">
            {#each $inputsWork as inputWork (inputWork.id)}
                <div class="w-[525px] p-2 mt-6 rounded-[12px] bg-[#F8E0ED] relative">
                    <button type="button" on:click={() => removeInputsWork(inputWork.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-4 -top-4"><X size={10} weight="bold" /></button>
                    <div class="relative w-full">
                        <input type="text" placeholder="Job Role" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                        <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                    </div>
                    <div class="w-full flex items-center justify-between space-x-2 mt-3">
                        <div class="relative w-[45%]">
                            <input type="text" placeholder="Company Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                            <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        <div class="relative w-[27%]">
                            <input type="text" placeholder="Year Started" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                            <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        <input type="text" placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
                    </div>
                </div>
            {/each}
        </div>

        <div class="w-full flex items-center justify-start mt-12 font-semibold text-[#DA478D]">
            EMERGENCY DETAILS
        </div>
        <div class="mt-6 relative w-full">
            <input type="text" placeholder="Contact Person" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="mt-6 relative w-full">
            <input type="text" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
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
                        <input type="file" id="custom-input" name="file" accept="image/jpeg, image/jpg, image/png" hidden on:change={handleFileChange} required/>
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
        
        <TCPP />
        
        <button type="submit" class="mt-3 text-[#353535] font-semibold w-[225px] py-3 bg-[#F4B8DA] rounded-[50px]">Sign Up</button>
    </form>
</div> -->
