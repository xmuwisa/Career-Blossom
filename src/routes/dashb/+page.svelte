<script>
    import { onMount } from 'svelte';
    import NavBar from '../../components/navigationBar.svelte';
    import JobForm from '../../components/jobForm.svelte';
  
</script>
  
<div class="flex items-start justify-center w-svw h-auto relative">
    <div class="w-auto sticky top-0 left-0">
        <NavBar />
    </div>
    <div class="w-full h-auto min-h-svh pt-8 pr-8 pb-8 overflow-x-auto">
        <div class="bg-[#FFFFFF] w-full h-auto min-h-svh rounded-[25px] p-8">
            <div class="w-full flex items-start justify-between space-x-2">
                <span class="w-[100%] h-full"><JobForm /></span>
            </div>
        </div>
    </div>
</div>