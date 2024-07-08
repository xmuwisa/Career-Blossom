<script>
    import { goto } from '$app/navigation';
    import Logout from './logout.svelte';
    import { onMount } from 'svelte';

    
    let candidateInfo = {};
    let candidateInfoFetched = false;
    let photoUrl = '';  
    let url = '';

    onMount(async () => {
        if (candidateInfoFetched) return;

        try {
            const response = await fetch('/api/get_candidate_info');

            if (response.ok) {
                candidateInfo = await response.json();
                candidateInfoFetched = true;
                url = candidateInfo.photo_url;
                photoUrl = url.replace(/^static\//, '/');;
                
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });
</script>

<div class="w-[300px] h-svh sticky border p-6">
    <div class="flex items-center justify-start border">
        <div class="avatar">
            <div class="w-12 rounded-full">
              <img src="{photoUrl}" />
            </div>
        </div>
        <span></span>
    </div>
    
    <Logout />
</div>