<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let candidateUserInfo = {};
    let candidateEducInfo = [];
    let candidateWorkInfo = [];

    onMount(async () => {

        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
                url = candidateUserInfo.photo_url;
                photoUrl = url.replace(/^static\//, '/');;
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }

        try {
        const response = await fetch('/api/get_candidate_educ_info');

        if (response.ok) {
            candidateEducInfo = await response.json();
        } else {
            console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }

        try {
        const response = await fetch('/api/get_candidate_work_info');

        if (response.ok) {
            candidateWorkInfo = await response.json();
        } else {
            console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });

    function getAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
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

<div class="border w-full h-full flex flex-col p-8">
    <div class="w-full h-[25px] flex items-end justify-end mt-2">
        <button type="button" class="bg-[#F4B8DA] text-[#353535] opacity-80 hover:opacity-100 py-2 px-8 rounded-[10px]" on:click={() => goto('/profile/edit')}>EDIT PROFILE</button>
    </div>
    <span class="w-full text-[#DA478D] text-[18px] font-semibold">
        PERSONAL DETAILS 
    </span>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">First Name</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.first_name}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Middle Name</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.middle_name}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Last Name</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.last_name}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Suffix</span>
            <div class="min-w-[150px] bg-[#FFFFFF] rounded-[10px] w-auto p-4 uppercase">{candidateUserInfo.suffix}</div>
        </div>
    </div>
    <div class="flex flex-col items-start justify-start space-y-2 mt-8">
        <span class="font-semibold text-[14px]">Address</span>
        <div class="bg-[#FFFFFF] rounded-[10px] w-full p-4 break-words uppercase" >{candidateUserInfo.address}</div>
    </div>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Sex</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{getSex(candidateUserInfo.sex)}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Civil Status</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{getCivilStatus(candidateUserInfo.civil_status)}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Religion</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.religion}</div>
        </div>
    </div>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Birth Place</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.birth_place}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Birth Date</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{new Date(candidateUserInfo.birth_date).toLocaleDateString()}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Age</span>
            <div class="w-[60px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{getAge(candidateUserInfo.birth_date)}</div>
        </div>
    </div>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Height</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.height} cm</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Weight</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.weight} kg </div> 
            <!-- format this -->
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Contact Number</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.contact_number}</div>
        </div>
    </div>
    <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-8">
        IDENTIFICATION DETAILS 
    </span>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">SSS Number</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.sss_number}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">TIN Number</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.tin_number}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">PAG-IBIG NUMBER</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.pagibig_number}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">PHILHEALTH NUMBER</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.philhealth_number}</div>
        </div>
    </div>
    <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-8">
        EMERGENCY DETAILS 
    </span>
    <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Emergency Contact Person</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.emergency_name}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Emergency Contact Number</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{candidateUserInfo.emergency_contact}</div>
        </div>
    </div>
    <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-8">
        EDUCATION HISTORY DETAILS 
    </span>
    {#each candidateEducInfo as educInfo}
        <div class="w-full flex items-center justify-start mt-8 space-x-4">
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">School Name</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{educInfo.school_name}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Degree Type</span>
            <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{educInfo.degree_type}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Year Started</span>
            <div class="min-w-[150px] bg-[#FFFFFF] rounded-[10px] w-auto p-4 uppercase">{educInfo.year_started}</div>
        </div>
        <div class="flex flex-col items-start justify-start space-y-2">
            <span class="font-semibold text-[14px]">Year Ended</span>
            <div class="min-w-[150px] bg-[#FFFFFF] rounded-[10px] w-auto p-4 uppercase">{educInfo.year_ended}</div>
        </div>
        </div>
    {/each}
    <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-8">
        WORK HISTORY DETAILS
    </span>
    {#if candidateWorkInfo.length > 0}
        {#each candidateWorkInfo as workInfo}
            <div class="w-full flex items-center justify-start mt-8 space-x-4">
                <div class="flex flex-col items-start justify-start space-y-2">
                    <span class="font-semibold text-[14px]">Job Role</span>
                    <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{workInfo.job_role}</div>
                </div>
                <div class="flex flex-col items-start justify-start space-y-2">
                    <span class="font-semibold text-[14px]">Company</span>
                    <div class="w-[300px] bg-[#FFFFFF] rounded-[10px] p-4 uppercase">{workInfo.company}</div>
                </div>
                <div class="flex flex-col items-start justify-start space-y-2">
                    <span class="font-semibold text-[14px]">Year Started</span>
                    <div class="min-w-[150px] bg-[#FFFFFF] rounded-[10px] w-auto p-4 uppercase">{workInfo.year_started}</div>
                </div>
                <div class="flex flex-col items-start justify-start space-y-2">
                    <span class="font-semibold text-[14px]">Year Ended</span>
                    <div class="min-w-[150px] bg-[#FFFFFF] rounded-[10px] w-auto p-4 uppercase">{workInfo.year_ended}</div>
                </div>
            </div>
        {/each}
    {:else}
        <p class="mt-8">No work history found.</p>
    {/if}
</div>