<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let applicationList = [];
    let filteredApplicationList = [];

    let candidateUserInfo = {};

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
            const response = await fetch('/api/get_application_list');
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

    async function deleteApplication(appId) {
        if (confirm('Are you sure you want to cancel this application?')) {
            try {
                const response = await fetch(`/api/delete_application?appId=${appId}`, {
                    method: 'DELETE',
                    credentials: 'include' 
                });

                if (response.ok) {
                    filteredApplicationList = filteredApplicationList.filter(app => app.application_id!== appId);
                } else {
                    console.error('Error deleting application:', response.status);
                }
            } catch (error) {
                console.error('Error deleting application:', error);
            }
        }
    }
</script>




{#if candidateUserInfo.role === "admin"}
<div class="w-full mt-16 flex items-center justify-center">
    <span class="font-medium opacity-70 hover:opacity-100">You cannot apply.</span>
</div>
    
{:else}

<div class="border w-full h-full flex flex-col p-8">
    {#if filteredApplicationList.length === 0}
        <div class="my-16 flex justify-center">
            <span class="text-[#353535] text-[18px] flex flex-col items-center space-y-4">
                <span class="font-medium opacity-70 hover:opacity-100">No applications found. Interested in applying?</span>
                <button class="font-semibold bg-[#fdb3d7] text-[#353535] py-3 px-8 rounded-[25px] opacity-70 hover:opacity-100" on:click={() => goto('/job')}>
                    Apply
                </button>
            </span>
        </div>
    {:else}
        <span class="w-full text-[#DA478D] text-[18px] font-semibold mt-8">
            APPLICATIONS
        </span>
        <div class="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each filteredApplicationList.sort((a, b) => new Date(b.date) - new Date(a.date)) as application}
            <div class="w-full h-[175px] bg-[#fffbfd] shadow-xl rounded-[15px] flex flex-col p-4">
                <div class="h-full flex flex-col items-center justify-between">
                    <div class="w-full flex flex-col items-start justify-start space-y-3">
                        <span class="opacity-70 w-full flex flex-col items-end justify-end">
                            {new Date(application.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
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
                    <span class="w-full mt-4 flex items-center justify-end">
                      <button class="bg-[#fdb3d7] text-[#353535] text-[14px] py-2 px-8 rounded-[10px] opacity-70 hover:opacity-100" on:click={() => deleteApplication(application.application_id)}>CANCEL</button>
                    </span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
    {/if}
</div>
{/if}