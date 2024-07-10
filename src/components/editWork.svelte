<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Asterisk } from 'phosphor-svelte';

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;
    let candidateWorkInfoFetched = false;
    let selectedWorkHistoryItem = null;

    let workHistory = [];
    let newJobRole = '';
    let newCompany = '';
    let newYearStarted = '';
    let newYearEnded = '';

    async function addWorkHistory() {
        const formData = new FormData();
        formData.append('candidateId', candidateUserInfo.candidate_id);
        formData.append('workRecords', JSON.stringify([
        {
            jobRole: newJobRole,
            company: newCompany,
            yearStarted: newYearStarted,
            yearEnded: newYearEnded
        }
        ]));

        const response = await fetch('/api/insert_work', {
        method: 'POST',
        body: formData
        });

        if (response.ok) {
        workHistory = [...workHistory, {
            jobRole: newJobRole,
            company: newCompany,
            yearStarted: newYearStarted,
            yearEnded: newYearEnded
        }];
        newJobRole = '';
        newCompany = '';
        newYearStarted = '';
        newYearEnded = '';

        location.reload();
        } else {
        console.error('Error adding work history');
        }
    }

    async function deleteWorkHistory(id) {
    try {
    const response = await fetch(`/api/delete_work?id=${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log(`Work history with id ${id} deleted successfully`);
        // Update the workHistory array by filtering out the deleted item
        workHistory = workHistory.filter(item => item.work_history_id!== id);
    } else {
        console.error(`Error deleting work history with id ${id}: ${response.statusText}`);
    }
    } catch (error) {
    console.error(`Error deleting work history with id ${id}: ${error.message}`);
    }
    }



    async function updateWorkHistory() {
    if (!selectedWorkHistoryItem) return;

    const formData = new FormData();
    formData.append('candidateId', candidateUserInfo.candidate_id);
    formData.append('workRecords', JSON.stringify([
        {
        work_history_id: selectedWorkHistoryItem.work_history_id,
        jobRole: newJobRole,
        company: newCompany,
        yearStarted: newYearStarted,
        yearEnded: newYearEnded
        }
    ]));

    const response = await fetch('/api/update_work', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        // Update the workHistory array by finding the item with the same id and updating its values
        workHistory = workHistory.map(item => {
        if (item.work_history_id === selectedWorkHistoryItem.work_history_id) {
            return {
            work_history_id: item.work_history_id,
            jobRole: newJobRole,
            company: newCompany,
            yearStarted: newYearStarted,
            yearEnded: newYearEnded
            };
        }
        return item;
        });
        selectedWorkHistoryItem = null;
        newJobRole = '';
        newCompany = '';
        newYearStarted = '';
        newYearEnded = '';

        location.reload();
    } else {
        console.error('Error updating work history');
    }
    }

    function selectWorkHistoryItem(item) {
    selectedWorkHistoryItem = item;
    newJobRole = item.job_role;
    newCompany = item.company;
    newYearStarted = item.year_started;
    newYearEnded = item.year_ended;
    }

    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
        const response = await fetch('/api/get_candidate_user_info');

        if (response.ok) {
            candidateUserInfo = await response.json();
            candidateUserInfoFetched = true;
        } else {
            console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
        console.error('Error fetching candidate info:', error);
        }

        try {
        const response = await fetch('/api/get_candidate_work_info');

        if (response.ok) {
            workHistory = await response.json(); // Update workHistory array
            candidateWorkInfoFetched = true;
        } else {
            console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
        console.error('Error fetching candidate info:', error);
        }
    });
</script>

<div class="w-full flex items-center justify-start mt-8 font-semibold text-[#DA478D] p-4">
    WORK HISTORY
</div>

<div class="p-4">
    <table class="table">
        <thead class="">
            <tr class="">
                <th>Job Role</th>
                <th>Company</th>
                <th>Year Started</th>
                <th>Year Ended</th>
            </tr>
        </thead>
        <tbody>
            {#if workHistory.length > 0}
                {#each workHistory as item}
                <tr>
                    <td>{item.job_role}</td>
                    <td>{item.company}</td>
                    <td>{item.year_started}</td>
                    <td>{item.year_ended}</td>
                    <td>
                        <button class="font-semibold text-[#353535] bg-[#9fdd9d] text-[12px] rounded-[5px] opacity-80 py-2 px-4 hover:opacity-100" on:click={() => selectWorkHistoryItem(item)}>
                            Update
                        </button>
                    </td>
                    <td>
                        <button class="font-semibold text-[#353535] bg-[#dd9d9d] text-[12px] rounded-[5px] opacity-80 py-2 px-4 hover:opacity-100" on:click={() => deleteWorkHistory(item.work_history_id)}>
                            Delete
                        </button>
                    </td>
                </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4">No work history found.</td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

  
<form class="p-4">
    <div class="w-full flex flex-col items-center justify-center p-2 rounded-[15px] bg-[#f2f2f2]">
    <div class="relative w-full">
        <input type="text" bind:value={newJobRole} placeholder="Job Role" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" required/>
        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
    </div>
    <div class="flex w-full">
        <div class="relative w-[60%]">
            <input type="text" bind:value={newCompany} placeholder="Company" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="relative w-[20%]">
            <input type="text" bind:value={newYearStarted} placeholder="Year Started" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]" required/>
            <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        <br />
        </div>
        <div class="relative w-[20%]">
            <input type="text" bind:value={newYearEnded} placeholder="Year Ended" class="w-full rounded-[10px] p-4 border-4 border-[#f2f2f2] hover:bg-[#FFF7F7]"/>
        </div>
    </div>
    <div class="w-full flex items-center justify-end mt-5 space-x-2">
        <button on:click={updateWorkHistory} class="uppercase font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] rounded-[5px] opacity-80 py-3 w-[160px] hover:opacity-100">Update</button>
        <button on:click={addWorkHistory} class="uppercase font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] rounded-[5px] opacity-80 py-3 w-[160px] hover:opacity-100">
            INSERT
        </button>
    </div>
  </form>

<style>
    input {
        @apply text-[14px];
    }
</style>