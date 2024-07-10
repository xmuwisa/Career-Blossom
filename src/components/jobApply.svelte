<script>
    import { onMount } from "svelte";
    import { Funnel, MagnifyingGlass } from "phosphor-svelte";
    import { Asterisk, Check, X } from "phosphor-svelte";
    import { goto } from '$app/navigation';
    import { candidateIdStore } from '$lib/store';

    function navigateToProfile(candidateId) {
        candidateIdStore.set(candidateId);
        goto('/applicant-profile');
    }

    let jobList = [];
    let applicationsList = [];
    let applicationList = [];
    let selectedJobId = '';
    let filteredJobList = [];
    let candidateUserInfo = {};
    let employmentType = ''; 
    let searchQuery = '';
    let selectedAvailability = '';
    let employmentTypeFilter = 'Full-Time';
    let totalPendings = {};

    let modals = {};

    onMount(async () => {
        try {
            const response = await fetch('/api/get_job_list');
            if (response.ok) {
                jobList = await response.json();
                filteredJobList = jobList; 
                selectedJobId = jobList[0].job_id; 
            } else {
                console.error('Failed to fetch job list');
            }
        } catch (error) {
            console.error('Error fetching job list:', error);
        }

        try {
            const response = await fetch('/api/get_candidate_user_info');
            if (response.ok) {
                candidateUserInfo = await response.json();
                url = candidateUserInfo.photo_url;
                photoUrl = url.replace(/^static\//, '/');
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }

        try {
            const response = await fetch('/api/get_application_list');
            if (response.ok) {
                applicationsList = await response.json();
            } else {
                console.error('Failed to fetch applications list');
            }
        } catch (error) {
            console.error('Error fetching applications list:', error);
        }

        try {
            const response = await fetch('/api/get_application_list');
            if (response.ok) {
                applicationList = await response.json();
            } else {
                console.error('Failed to fetch applications list');
            }
        } catch (error) {
            console.error('Error fetching applications list:', error);
        }

        try {
            const response = await fetch('/api/get_total_pendings');
            if (response.ok) {
                const pendingsData = await response.json();
                totalPendings = pendingsData.reduce((acc, { job_id, total_pendings }) => {
                    acc[job_id] = total_pendings;
                    return acc;
                }, {});
            } else {
                console.error('Failed to fetch total pendings');
            }
        } catch (error) {
            console.error('Error fetching total pendings:', error);
        }

    });

    function handleSearch() {
        filteredJobList = jobList.filter(job => {
            const matchesSearch = job.job_role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAvailability = selectedAvailability ? job.status === selectedAvailability : true;
            return matchesSearch && matchesAvailability;
        });
    }

    function handleAvailabilityFilter(status) {
        selectedAvailability = status === selectedAvailability ? '' : status;
        handleSearch();
    }

        async function handleApply(jobId, employmentType) {
            try {
                const response = await fetch('/api/insert_application', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobId, employmentType }),
                });

                if (response.ok) {
                    console.log('Application submitted successfully');
                    location.reload();
                } else {
                    console.error('Failed to submit application:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error submitting application:', error);
            }
        }

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

<div class="w-full h-auto">
    <div class="w-full flex items-center justify-end mt-8 space-x-4 ">
        {#if candidateUserInfo.role === 'admin'}
            <button class="bg-[#ff8fd0] text-[#141414] font-semibold shadow opacity-80 hover:opacity-100 py-2 px-8 rounded-[10px]" on:click={() => goto('/job/edit')}>EDIT JOBS</button>
        {/if}
        
        <form on:submit|preventDefault={handleSearch}>
            <span class="flex items-center justify-between space-x-2 rounded-[25px] bg-[#f4f4f4] pr-4">
                <div class="relative">
                    <input type="text" name="Search" class="p-2 border-2 w-[250px] text-[14px] rounded-[25px] pl-8" placeholder="Search" bind:value={searchQuery} on:input={handleSearch} />
                    <button class="absolute left-3 top-3"><MagnifyingGlass size={16} weight="bold" color="#a3a3a3" /></button>
                </div>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button"><Funnel size={20} weight="bold"/></div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-[10px] z-[1] w-36 p-2 mt-6 shadow">
                        <li class="hover:bg-[#f3f3f3] rounded-[8px]" on:click={() => handleAvailabilityFilter('A')}><a>Available</a></li>
                        <li class="hover:bg-[#f3f3f3] rounded-[8px]" on:click={() => handleAvailabilityFilter('NA')}><a>Not Available</a></li>
                    </ul>
                </div>
            </span> 
        </form>
    </div>
    <div class="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each filteredJobList as job}
            <div class="w-full h-auto bg-[#fffbfd] shadow-xl rounded-[15px] flex flex-col p-8 relative border">
                {#if candidateUserInfo.role === 'admin'}
                    {#if totalPendings[job.job_id]}
                        <span class="flex items-center text-[14px] justify-center w-9 h-9 bg-[#ddebc8] font-semibold rounded-full absolute -top-2 -right-2">
                            {totalPendings[job.job_id]}
                        </span>
                    {/if}
                {/if}
                <span class="font-semibold">{job.job_role}</span>
                <span class={`text-[14px] font-semibold ${job.status === 'A' ? 'text-[#d1c843]' : 'text-[#af2d4e]'}`}>{job.status === 'A'? 'Available' : 'Not Available'}</span>
                <div class="w-full flex items-center justify-end">
                    <button 
                    class="w-[100px] h-[40px] bg-[#DA478D] text-[#ffffff] rounded-[10px] disabled:opacity-40" 
                    on:click={() => modals[job.job_id].showModal()} 
                    disabled={
                      job.status === 'NA' || 
                      (candidateUserInfo.role === 'user' && 
                        applicationsList.some(application => 
                          application.candidate_id === candidateUserInfo.candidate_id && 
                          ['P', 'A'].includes(application.application_status)
                        )
                      )
                    }>
                    {#if candidateUserInfo.role === 'user' }     
                      Apply
                    {:else }
                      View
                    {/if}
                  </button>
                    <dialog bind:this={modals[job.job_id]} id={`my_modal_${job.job_id}`} class="modal">
                    <div class="modal-box bg-[#FFFFFF] h-[70%] overflow-auto">
                        <h3 class="text-lg text-[#DA478D] font-bold">{job.job_role}</h3>
                        <p class="py-4">{job.description}</p>
                        {#if candidateUserInfo.role === 'user'}  
                            <div class="w-full mt-16">
                                <form class="w-full flex items-center justify-between space-x-2">
                                    <div class="relative w-[70%]">
                                        <select name="employmentType" class="w-full p-4 rounded-[10px] text-gray-400 border-2" bind:value={employmentType} required>
                                            <option disabled selected value="">Employment Type</option>
                                            <option>Full-Time</option>
                                            <option>Part-Time</option>
                                            <option>Contract</option>
                                        </select>
                                        <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                                    </div>
                                    <button class="w-[30%] h-[40px] bg-[#DA478D] text-[#ffffff] rounded-[10px]"  on:click={() => {
                                            if (confirm('Once you apply, you cannot apply again with a pending or accepted status.')) {handleApply(job.job_id, employmentType);}}}>
                                        Confirm Apply
                                        </button>
                                </form>

                            </div>
                        {:else }
                            <div class="p-4 bg-[#fafafa] mt-4 w-full flex flex-col space-y-3 text-[14px] rounded-[12px]">
                                <span class="font-semibold flex items-center justify-between">
                                    <span>Applicant List: {employmentTypeFilter}</span>
                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button"><Funnel size={20} weight="bold"/></div>
                                        <ul tabindex="0" class="dropdown-content menu rounded-[10px] z-[1] w-36 p-2 mt-6 s bg-[#FFFFFF] shadow">
                                            <li class="hover:bg-[#f3f3f3] rounded-[8px]" on:click={() => employmentTypeFilter = 'Full-Time'}><a>Full-Time</a></li>
                                            <li class="hover:bg-[#f3f3f3] rounded-[8px]" on:click={() => employmentTypeFilter = 'Part-Time'}><a>Part-Time</a></li>
                                            <li class="hover:bg-[#f3f3f3] rounded-[8px]" on:click={() => employmentTypeFilter = 'Contract'}><a>Contract</a></li>
                                        </ul>
                                    </div>
                                </span>
                                {#each applicationsList.filter(app => app.job_id === job.job_id && app.application_status === 'P' && (
                                    employmentTypeFilter === 'Full-Time' ? app.employment_type === 'FT' :
                                    employmentTypeFilter === 'Part-Time' ? app.employment_type === 'PT' :
                                    employmentTypeFilter === 'Contract' ? app.employment_type === 'C' : true
                                  )).sort((a, b) => new Date(a.date) - new Date(b.date)) as application}
                                    <div class="w-full flex items-center justify-between bg-[#FFFFFF] rounded-[10px] p-4">
                                        <span class="w-full flex items-center justify-start space-x-3">
                                            <button class="text-[#DA478D] font-semibold rounded-l-[10px] opacity-60 hover:opacity-100 bg-[#ffa9cd] p-3" on:click={() => navigateToProfile(application.candidate_id)}>{application.candidate_id}</button>
                                            <span>{application.username}</span>
                                            
                                        </span>
                                        <span class="flex items-center justify-center space-x-3">
                                            <span class="opacity-70">
                                                {new Date(application.date).toLocaleDateString()}
                                              </span>
                                            <button class="bg-[#ec9cb0] opacity-80 hover:opacity-100 p-2 rounded-[10px]" on:click={() => confirmReject(application.application_id, job.job_id)}><X size={18} weight="bold" /></button>
                                            <button class="bg-[#88ddb6] opacity-80 hover:opacity-100 p-2 rounded-[10px]" on:click={() => confirmAccept(application.application_id, job.job_id)}><Check size={18} weight="bold" /></button>
                                        </span>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                    </dialog>
                </div>
            </div>
        {/each}
    </div>
</div>
