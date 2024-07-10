<script>
    import { onMount } from 'svelte';
    import NavBar from '../../components/navigationBar.svelte';
    import { Camera } from 'phosphor-svelte';
    import { goto } from '$app/navigation';
    import ProfileDetails from '../../components/profileDetails.svelte';
    import ProfileApplications from '../../components/profileApplications.svelte';
  
    let applicationList = [];

    let candidateUserInfo = {};

    let photoUrl = '';
    let url = '';
    let activeTab = 'details';

    function toggleTab(tab) {
        activeTab = tab;
    }

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
            const response = await fetch('/api/get_application_list');
            if (response.ok) {
                applicationList = await response.json();
            } else {
                console.error('Failed to fetch applications list');
            }
        } catch (error) {
            console.error('Error fetching applications list:', error);
        }
    });
</script>
  
<div class="flex items-start justify-center w-svw h-auto relative">
    <div class="w-auto sticky top-0 left-0">
    <NavBar />
    </div>
    <div class="w-full h-auto min-h-svh pt-8 pr-8 pb-8 overflow-x-auto">
      <div class="bg-[#ffe1f1] w-full h-auto min-h-svh rounded-[25px]">
            <div class="bg-[#ffffff] w-full flex items-center justify-start space-x-2 p-8 rounded-t-[25px]">
                <img src="/assets/career-blossom-logo.png" class="w-10" alt="Career Blossom Inc. Logo" />
                <span class="text-[#DA478D] font-serif font-extrabold italic text-2xl">Career Blossom Inc.</span>
            </div>
            <div class="bg-[#ffffff] w-full flex flex-col items-center justify-center space-y-4 pt-8 px-8 pb-16">
                <div class="relative">
                    <div class="avatar cursor-pointer" on:click={() => goto('/profile')}>
                        <div class="w-72 rounded-full border-[30px] border-[#f0f0f0]">
                            <img src="{photoUrl}" />
                        </div>
                    </div>
                    <span class="absolute bottom-5 right-5 bg-[#f0f0f0] p-4 rounded-full opacity-50 cursor-pointer hover:opacity-90" on:click={() => goto('/profile/photo-upload')}><Camera size={40} weight="fill" color="#353535"/></span>
                </div>
                <div class="flex flex-col space-y-1 items-center justify-center">
                    <span class="text-[22px] font-semibold text-[#DA478D]">{candidateUserInfo.username}</span>
                    <span class="opacity-90 font-medium">{candidateUserInfo.email}</span>
                    {#if candidateUserInfo.role === 'admin'}
                        <span class="text-[#dd73a6] text-[16px] opacity-90 uppercase">Admin</span>
                    {:else if candidateUserInfo.role === 'user'}
                        {#if applicationList.some(application => application.application_status === 'A')}
                            {#each applicationList as application}
                                {#if application.application_status === 'A'}
                                    <span class="text-[#dd73a6] text-[16px] opacity-90 uppercase">{application.job_role}</span>
                                {/if}
                            {/each}
                        {:else}
                            <span class="text-[#dd73a6] text-[16px] opacity-90 uppercase">Applicant</span>
                        {/if}
                    {/if}
                </div>
            </div>
            <div class="w-full flex items-center justify-between bg-[#fcfcfc]">
                <button class="w-[50%] hover:bg-[#f2f2f2] py-5 border-b-4" class:border-[#DA478D]={activeTab === 'details'} on:click={() => toggleTab('details')}>DETAILS</button>
                <button class="w-[50%] hover:bg-[#f2f2f2] py-5 border-b-4" class:border-[#DA478D]={activeTab === 'applications'} on:click={() => toggleTab('applications')}>APPLICATIONS</button>
            </div>
            {#if activeTab === 'details'}
                <ProfileDetails />
            {:else if activeTab === 'applications'}
                <ProfileApplications />
            {/if}
        </div>
    </div>
</div>

  
  