<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Asterisk } from 'phosphor-svelte';

    let candidateUserInfo = {};
    let selectedEducationHistoryItem = null;

    let educationHistory = [];
    let newSchoolName = '';
    let newDegreeType = '';
    let newYearStarted = '';
    let newYearEnded = '';

    async function addEducationHistory() {
        const formData = new FormData();
        formData.append('candidateId', candidateUserInfo.candidate_id);
        formData.append('educationRecords', JSON.stringify([
            {
                schoolName: newSchoolName,
                degreeType: newDegreeType,
                yearStarted: newYearStarted,
                yearEnded: newYearEnded
            }
        ]));

        const response = await fetch('/api/insert_education', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            educationHistory = [...educationHistory, {
                schoolName: newSchoolName,
                degreeType: newDegreeType,
                yearStarted: newYearStarted,
                yearEnded: newYearEnded
            }];
            newSchoolName = '';
            newDegreeType = '';
            newYearStarted = '';
            newYearEnded = '';

            location.reload();
        } else {
            console.error('Error adding education history');
        }
    }

    async function deleteEducationHistory(id) {
        try {
            const response = await fetch(`/api/delete_education?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Education history with id ${id} deleted successfully`);
                educationHistory = educationHistory.filter(item => item.education_history_id !== id);
            } else {
                console.error(`Error deleting education history with id ${id}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error deleting education history with id ${id}: ${error.message}`);
        }
    }

    const degreeTypeEnum = {
        'High School': 'High School',
        'Associate': 'Associate',
        'Bachelor': 'Bachelor',
        'Master': 'Master',
        'PhD': 'PhD',
        'Doctorate': 'Doctorate',
        'Certificate': 'Certificate',
        'Other': 'Other'
    };

    async function updateEducationHistory() {
        if (!selectedEducationHistoryItem) return;

        const formData = new FormData();
        formData.append('candidateId', candidateUserInfo.candidate_id);
        formData.append('educationRecords', JSON.stringify([
            {
            education_history_id: selectedEducationHistoryItem.education_history_id,
            schoolName: newSchoolName,
            degreeType: degreeTypeEnum[newDegreeType], 
            yearStarted: newYearStarted,
            yearEnded: newYearEnded || null
            }
        ]));

        console.log('FormData:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }


        try {
            const response = await fetch('/api/update_education', {
            method: 'POST',
            body: formData
            });

            if (response.ok) {
            educationHistory = educationHistory.map(item => {
                if (item.education_history_id === selectedEducationHistoryItem.education_history_id) {
                return {
                    education_history_id: item.education_history_id,
                    schoolName: newSchoolName,
                    degreeType: newDegreeType,
                    yearStarted: newYearStarted,
                    yearEnded: newYearEnded || null
                };
                }
                return item;
            });
            selectedEducationHistoryItem = null;
            newSchoolName = '';
            newDegreeType = '';
            newYearStarted = '';
            newYearEnded = '';

            location.reload();
            } else {
            const errorText = await response.text();
            console.error('Error updating education history:', response.statusText, errorText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
        }


    function selectEducationHistoryItem(item) {
        selectedEducationHistoryItem = item;
        newSchoolName = item.school_name;
        newDegreeType = item.degree_type;
        newYearStarted = item.year_started;
        newYearEnded = item.year_ended;
    }

    onMount(async () => {
        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }

        try {
            const response = await fetch('/api/get_candidate_educ_info');

            if (response.ok) {
                educationHistory = await response.json(); 
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });
</script>


<div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D] p-4">
    EDUCATION HISTORY
</div>

<div class="p-4">
    <table class="table">
        <thead class="">
            <tr class="">
                <th>School Name</th>
                <th>Degree Type</th>
                <th>Year Started</th>
                <th>Year Ended</th>
            </tr>
        </thead>
        <tbody>
            {#if educationHistory.length > 0}
                {#each educationHistory as item}
                <tr>
                    <td>{item.school_name}</td>
                    <td>{item.degree_type}</td>
                    <td>{item.year_started}</td>
                    <td>{item.year_ended}</td>
                    <td>
                        <button class="font-semibold text-[#353535] bg-[#9fdd9d] text-[12px] rounded-[5px] opacity-80 py-2 px-4 hover:opacity-100" on:click={() => selectEducationHistoryItem(item)}>
                            Update
                        </button>
                    </td>
                    <td>
                        {#if educationHistory.length > 1}
                            <button class="font-semibold text-[#353535] bg-[#dd9d9d] text-[12px] rounded-[5px] opacity-80 py-2 px-4 hover:opacity-100" on:click={() => deleteEducationHistory(item.education_history_id)}>
                                Delete
                            </button>
                        {:else}
                            <button class="font-semibold disabled:opacity-50 text-[#353535] bg-[#dd9d9d] text-[12px] rounded-[5px] opacity-80 py-2 px-4 hover:opacity-100" on:click={() => deleteEducationHistory(item.education_history_id)} disabled>
                                Delete
                            </button>
                        {/if}
                    </td>
                </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4">No education history found.</td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<form class="p-4">
    <div class="w-full flex flex-col items-center justify-center p-2 rounded-[15px] bg-[#f2f2f2]">
        <div class="relative w-full">
            <input type="text" bind:value={newSchoolName} placeholder="School Name" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="flex w-full">
            <div class="relative w-[60%]">
                <select class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" bind:value={newDegreeType} required>
                    <option disabled selected value="">Degree Type</option>
                    <option>High School</option>
                    <option>Associate</option>
                    <option>Bachelor</option>
                    <option>Master</option>
                    <option>PhD</option>
                    <option>Doctorate</option>
                    <option>Certificate</option>
                    <option>Other</option>
                </select>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            </div>
            <div class="relative w-[20%]">
                <input type="text" bind:value={newYearStarted} placeholder="Year Started" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" required/>
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            <br />
            </div>
            <div class="relative w-[20%]">
                <input type="text" bind:value={newYearEnded} placeholder="Year Ended" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" />
            </div>
        </div>
        <div class="w-full flex items-center justify-end mt-5 space-x-2">
            <button on:click={updateEducationHistory} class="uppercase font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] rounded-[5px] opacity-80 py-3 w-[160px] hover:opacity-100">Update</button>
            <button on:click={addEducationHistory} class="uppercase font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] rounded-[5px] opacity-80 py-3 w-[160px] hover:opacity-100">
                INSERT
            </button>
        </div>
    </div>
</form>

<style>
    input, select {
        @apply text-[14px];
    }
</style>