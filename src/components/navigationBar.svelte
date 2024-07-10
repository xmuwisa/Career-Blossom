<script>
    import { goto } from '$app/navigation';
    import Logout from './logout.svelte';
    import { onMount } from 'svelte';
    import { Star } from 'phosphor-svelte';

    
    let candidateUserInfo = {};
    let photoUrl = '';  
    let url = '';
    let navButton;
    let toggled = false;

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
    });
</script>

<div class="h-svh p-8 flex flex-col justify-between items-start { !toggled ? 'w-[350px]' : 'w-auto' } ">
    <div class="w-full">
        <div class="flex items-center justify-end">
            <label class="swap swap-rotate" >
                <input type="checkbox" bind:checked={toggled}/>
                <svg
                  class="swap-on fill-[#DA478D]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg
                  class="swap-off fill-[#DA478D]" xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <polygon
                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
            </label>
        </div>
        {#if !toggled}
            <div class="flex items-center justify-start space-x-4 mt-6">
                <div class="avatar cursor-pointer" on:click={() => goto('/profile')}>
                    <div class="w-12 rounded-full">
                    <img src="{photoUrl}" />
                    </div>
                </div>
                <span class="flex items-center justify-start space-x-2 font-semibold">
                    <span>Hello, <span class="text-[#DA478D]">{candidateUserInfo.username}</span></span>
                    {#if candidateUserInfo.role === 'admin'}
                        <span><Star size={16} weight="fill" color="#BBBB12" /></span>
                    {/if}
                </span>
            </div>
            <div class="flex flex-col items-start justify-start space-y-2 mt-16 font-semibold text=[#353535]">
                <button class="flex items-center justify-start w-full hover:bg-[#f3d9e7] p-2 rounded-[10px]" on:click={() => goto('/profile')}>PROFILE</button>
                <button class="flex items-center justify-start w-full hover:bg-[#f3d9e7] p-2 rounded-[10px]" on:click={() => goto('/job')}>JOB</button>
                {#if candidateUserInfo.role === 'admin'}
                    <button class="flex items-center justify-start w-full hover:bg-[#f3d9e7] p-2 rounded-[10px]" on:click={() => goto('/dashb')}>DASHBOARD</button>
                {/if}
            </div>
        {/if}
    </div>

    {#if !toggled}
        <span class="w-full flex items-center justify-end"><Logout /></span>
    {/if}
</div>