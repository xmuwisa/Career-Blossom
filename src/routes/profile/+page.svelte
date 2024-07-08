<script>
    import { onMount } from 'svelte';
    import NavBar from '../../components/navigationBar.svelte';
    import ProfileDetails from '../../components/profileDetails.svelte';
    import ProfileApplications from '../../components/profileApplications.svelte';
  
    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;

    let photoUrl = '';
    let url = '';
    let activeTab = 'details';

    function toggleTab(tab) {
        activeTab = tab;
    }

    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
                candidateUserInfoFetched = true;
                url = candidateUserInfo.photo_url;
                photoUrl = url.replace(/^static\//, '/');;
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
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
                <div class="avatar cursor-pointer" on:click={() => goto('/profile')}>
                    <div class="w-72 rounded-full border-[30px] border-[#f0f0f0]">
                        <img src="{photoUrl}" />
                    </div>
                </div>
                <div class="flex flex-col space-y-1 items-center justify-center">
                    <span class="text-[22px] font-semibold text-[#DA478D]">{candidateUserInfo.username}</span>
                    {#if candidateUserInfo.role === 'admin'}
                        <span class="opacity-90">Admin</span>
                    {:else if candidateUserInfo.role === 'user'}
                        <span class="opacity-90">Applicant</span>
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

  
  