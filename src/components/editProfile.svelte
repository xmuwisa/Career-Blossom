<script>
    import { Info, Asterisk } from "phosphor-svelte";
    import { onMount } from 'svelte';

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;
    
    let birthDate = '';
    let age = '';
    let sssNumber = '';
    let tinNumber = '';
    let pagIbigNumber = '';
    let philhealthNumber = '';

    function calculateAge(dateString) {
        let today = new Date();
        let birthDateObj = new Date(dateString);
        let ageInYears = today.getFullYear() - birthDateObj.getFullYear();
        let m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            ageInYears--;
        }
        return ageInYears.toString();
    }

    $: {
        if (birthDate) {
            age = calculateAge(birthDate);
        }
    }

    function formatDate(dateString) {
        // Create a Date object from the ISO 8601 formatted string
        let date = new Date(dateString);
        
        // Extract the year, month, and day
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        
        // Return the formatted date string in "yyyy-MM-dd" format
        return `${year}-${month}-${day}`;
    }



    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
                candidateUserInfoFetched = true;

                // Update input fields with candidateUserInfo
                document.getElementsByName('firstName')[0].value = candidateUserInfo.first_name;
                document.getElementsByName('middleName')[0].value = candidateUserInfo.middle_name;
                document.getElementsByName('lastName')[0].value = candidateUserInfo.last_name;
                document.getElementsByName('suffix')[0].value = candidateUserInfo.suffix;
                document.getElementsByName('address')[0].value = candidateUserInfo.address;
                document.getElementsByName('sex')[0].value = candidateUserInfo.sex;
                document.getElementsByName('civilStatus')[0].value = candidateUserInfo.civil_status;
                document.getElementsByName('religion')[0].value = candidateUserInfo.religion;
                document.getElementsByName('birthPlace')[0].value = candidateUserInfo.birth_place;
                document.getElementsByName('birthDate')[0].value = formatDate(candidateUserInfo.birth_date);
                age = calculateAge(candidateUserInfo.birth_date);
                document.getElementsByName('height')[0].value = candidateUserInfo.height;
                document.getElementsByName('weight')[0].value = candidateUserInfo.weight;
                document.getElementsByName('contactNumber')[0].value = candidateUserInfo.contact_number;
                document.getElementsByName('sssNumber')[0].value = candidateUserInfo.sss_number;
                document.getElementsByName('tinNumber')[0].value = candidateUserInfo.tin_number;
                document.getElementsByName('pagIbigNumber')[0].value = candidateUserInfo.pagibig_number;
                document.getElementsByName('philHealthNumber')[0].value = candidateUserInfo.philhealth_number;
                document.getElementsByName('emergencyName')[0].value = candidateUserInfo.emergency_name;
                document.getElementsByName('emergencyContact')[0].value = candidateUserInfo.emergency_contact;
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });

    async function handleUpdate() {
    const formData = {
        firstNameInput: document.querySelector('input[name="firstName"]').value,
        middleNameInput: document.querySelector('input[name="middleName"]').value,
        lastNameInput: document.querySelector('input[name="lastName"]').value,
        suffixInput: document.querySelector('input[name="suffix"]').value,
        addressInput: document.querySelector('input[name="address"]').value,
        sexInput: document.querySelector('select[name="sex"]').value,
        civilStatusInput: document.querySelector('select[name="civilStatus"]').value,
        religionInput: document.querySelector('input[name="religion"]').value,
        birthPlaceInput: document.querySelector('input[name="birthPlace"]').value,
        birthDateInput: formatDate(document.querySelector('input[name="birthDate"]').value),
        heightInput: document.querySelector('input[name="height"]').value,
        weightInput: document.querySelector('input[name="weight"]').value,
        contactNumberInput: document.querySelector('input[name="contactNumber"]').value,
        sssNumberInput: document.querySelector('input[name="sssNumber"]').value,
        tinNumberInput: document.querySelector('input[name="tinNumber"]').value,
        pagIbigNumberInput: document.querySelector('input[name="pagIbigNumber"]').value,
        philhealthNumberInput: document.querySelector('input[name="philHealthNumber"]').value,
        emergencyNameInput: document.querySelector('input[name="emergencyName"]').value,
        emergencyContactInput: document.querySelector('input[name="emergencyContact"]').value
    };

    if (!validateFormData(formData)) {
        console.error('Please fill in all required fields');
        return;
    }

    const dataToSend = {
        first_name: formData.firstNameInput,
        middle_name: formData.middleNameInput,
        last_name: formData.lastNameInput,
        suffix: formData.suffixInput,
        address: formData.addressInput,
        sex: formData.sexInput,
        civil_status: formData.civilStatusInput,
        religion: formData.religionInput,
        birth_place: formData.birthPlaceInput,
        birth_date: formData.birthDateInput,
        height: formData.heightInput,
        weight: formData.weightInput,
        contact_number: formData.contactNumberInput,
        sss_number: formData.sssNumberInput,
        tin_number: formData.tinNumberInput,
        pagibig_number: formData.pagIbigNumberInput,
        philhealth_number: formData.philhealthNumberInput,
        emergency_name: formData.emergencyNameInput,
        emergency_contact: formData.emergencyContactInput
    };

    try {
        const response = await fetch('/api/update_candidate', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            console.log('Candidate updated successfully!');
        } else {
            console.error('Error updating candidate:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error updating candidate:', error);
    }
}

function validateFormData(formData) {
    const requiredFields = [
        'firstNameInput',
        'lastNameInput',
        'addressInput',
        'sexInput',
        'civilStatusInput',
        'religionInput',
        'birthPlaceInput',
        'birthDateInput',
        'heightInput',
        'weightInput',
        'contactNumberInput',
        'emergencyNameInput',
        'emergencyContactInput',
    ];

    for (const field of requiredFields) {
        if (!formData[field]) {
            return false;
        }
    }

    return true;
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

    function getSex(sex) {
        return sex === 'F' ? 'Female' : 'Male';
    }

    function getCivilStatus(status) {
        switch (status) {
            case 'S':
                return 'Single';
            case 'M':
                return 'Married';
            case 'W':
                return 'Widowed';
            case 'SP':
                return 'Separated';
            case 'D':
                return 'Divorced';
            default:
                return '';
        }
    }
</script>


<form method="post" class="w-full flex flex-col items-center justify-center p-4">
    <div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D]">
        PERSONAL DETAILS
    </div>
    <div class="w-full flex items-center justify-between space-x-4 mt-6">
        <div class="relative w-full">
            <input type="text" name="firstName" placeholder="First Name" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required />
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <input type="text" name="middleName" placeholder="Middle Name" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]"/>
    </div>
    <div class="w-full flex items-center justify-between space-x-4 mt-6">
        <div class="relative w-full">
            <input type="text" name="lastName" placeholder="Last Name" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        
        <input type="text" name="suffix" placeholder="Suffix" class="w-[20%] rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]"/>
    </div>
    <div class="relative w-full mt-6">
        <input type="text" name="address" placeholder="Address" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
    </div>
    
    <div class="w-full flex items-center justify-between space-x-4 mt-6">
        <div class="relative w-full">
            <select name="sex" class="w-full p-4 rounded-[10px] border-2 text-gray-400" required>
                <option disabled selected value="">Sex</option>
                <option value="M">{getSex('M')}</option>
                <option value="F">{getSex('F')}</option>
            </select>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="relative w-full">
            <select name="civilStatus" class="w-full p-4 border-2 rounded-[10px] text-gray-400" required>
                <option disabled selected value="">Civil Status</option>
                <option value="S">{getCivilStatus('S')}</option>
                <option value="M">{getCivilStatus('M')}</option>
                <option value="W">{getCivilStatus('W')}</option>
                <option value="SP">{getCivilStatus('SP')}</option>
                <option value="D">{getCivilStatus('D')}</option>
            </select>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="relative w-full">
            <input type="text" name="religion" placeholder="Religion" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
    </div>
    <div class="mt-6 relative w-full">
        <input type="text" name="birthPlace" placeholder="Birth Place" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]"  required/>
        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
    </div>
    <div class="w-full flex items-center justify-between space-x-4 mt-6">
        <div class="relative w-[75%]">
            <input type="date" name="birthDate" placeholder="Birth date" class="w-full text-gray-400 rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required bind:value={birthDate} on:input={handleDateChange} />
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <input type="number" placeholder="Age" class="w-[25%] bg-[#F8E0ED] rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" value={age} readonly />
    </div>
    <div class="w-full flex items-center justify-between space-x-4 mt-6">
        <div class="relative w-[50%]">
            <input type="text" name="height" placeholder="Height in cm" class="w-full text-gray-400 rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="relative w-[50%]">
            <input type="text" name="weight" placeholder="Weight in kg" class="w-full text-gray-400 rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
    </div>
    <div class="relative w-full mt-6">
        <input type="text" name="contactNumber" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
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
    <input type="text" name="sssNumber" placeholder="SSS Number" class="mt-6 w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
    <input type="text" name="tinNumber" placeholder="TIN Number" class="mt-6 w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7] id-input"  equired on:input={handleInputChange}/>
    <input type="text" name="pagIbigNumber" placeholder="PAG-IBIG Number" class="mt-6 w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>
    <input type="text" name="philHealthNumber" placeholder="PHILHEALTH Number" class="mt-6 w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7] id-input" required on:input={handleInputChange}/>

    <div class="w-full flex items-center justify-start mt-12 font-semibold text-[#DA478D]">
        EMERGENCY DETAILS
    </div>
    <div class="mt-6 relative w-full">
        <input type="text" name="emergencyName" placeholder="Contact Person" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
    </div>
    <div class="mt-6 relative w-full">
        <input type="text" name="emergencyContact" placeholder="Contact Number" class="w-full rounded-[10px] p-4 border-2 hover:bg-[#FFF7F7]" required/>
        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
    </div>

    <button type="button" class="font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] mt-16 rounded-[5px] opacity-80 py-3 w-[175px] hover:opacity-100 " on:click={handleUpdate}>
        UPDATE
    </button>
</form>

<style>
    input, select {
        @apply text-[13px];
    }
</style>