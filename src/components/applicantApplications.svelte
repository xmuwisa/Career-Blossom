<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import {Check, X } from "phosphor-svelte";
 
    export let candidateId;

    let applicationList = [];
    let filteredApplicationList = [];

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;

    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
            const response = await fetch(`/api/get_candidate_user_info?candidateId=${candidateId}`);

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
            const response = await fetch(`/api/get_application_list?candidateId=${candidateId}`);
            if (response.ok) {
                applicationList = await response.json();
                filteredApplicationList = applicationList.filter(app => app.candidate_id === candidateUserInfo.candidate_id);
            } else {
                console.error('Failed to fetch applications list');
            }
        } catch (error) {
            console.error('Error fetching applications list:', error);
        }
    });

    async function confirmReject(applicationId, jobId) {
        if (confirm(`Are you sure you want to reject this application?`)) {
            await updateApplicationStatus(applicationId, jobId, 'R');
            location.reload();
        }
    }

    async function confirmAccept(applicationId, jobId) {
        if (confirm(`Are you sure you want to accept this application?`)) {
            await updateApplicationStatus(applicationId, jobId, 'A');
            location.reload();
        }
    }

    async function updateApplicationStatus(applicationId, jobId, status) {
        console.log('updateApplicationStatus:', applicationId, jobId, status);
        try {
            const response = await fetch('/api/update_application_status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobId, applicationId, status }),
            });

            if (response.ok) {
                console.log('Application status updated successfully');
            } else {
                console.error('Error updating application status:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    }
</script>


<div class="border w-full h-full flex flex-col p-8">
    {#if filteredApplicationList.length === 0}
        <div class="my-16 flex justify-center">
            <span class="text-[#353535] text-[18px] flex flex-col items-center space-y-4">
                <span class="font-medium opacity-70 hover:opacity-100">No applications found. </span>
            </span>
        </div>
    {:else}
        <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-2">
            APPLICATIONS
        </span>
        <div class="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each filteredApplicationList.sort((a, b) => new Date(b.date) - new Date(a.date)) as application}
              <div class="w-full h-[175px] bg-[#fffbfd] shadow-xl rounded-[15px] flex flex-col p-4">
                <div class="h-full flex flex-col items-center justify-between">
                    <div class="w-full flex flex-col items-start justify-start space-y-3">
                        <span class="opacity-70 w-full flex flex-col items-end justify-end">
                            {new Date(application.date).toLocaleDateString()}
                        </span>
                        <span class="flex flex-col items-start justify-start p-2 bg-[#f2f2f2] w-full rounded-[8px]">
                            <span class="font-semibold">{application.job_role}</span>
                            <span class="flex items-start justify-start space-x-2">
                                <span class="font-semibold opacity-70 text-[14px]">
                                    {application.employment_type === 'FT'? 'Full-Time' : application.employment_type === 'PT'? 'Part-Time' : 'Contract'}
                                </span>
                                <span>-</span>
                                <span class={`text-[14px] font-semibold ${application.application_status === 'A'? 'text-[#d1c843]' : application.application_status === 'P'? 'text-[#ac81d4]' : 'text-[#c2384a]'}`}>
                                    {application.application_status === 'P'? 'Pending' : application.application_status === 'A'? 'Accepted' : 'Rejected'}
                                </span>
                            </span>
                            
                        </span>
                        
                    </div>
                  {#if application.application_status === 'P'}
                    <span class="flex items-center justify-end w-full space-x-3">
                        <button class="bg-[#ec9cb0] opacity-80 hover:opacity-100 p-2 rounded-[10px]" on:click={() => confirmReject(application.application_id, application.job_id)}><X size={18} weight="bold" /></button>
                        <button class="bg-[#88ddb6] opacity-80 hover:opacity-100 p-2 rounded-[10px]" on:click={() => confirmAccept(application.application_id, application.job_id)}><Check size={18} weight="bold" /></button>
                    </span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
    {/if}
</div>
