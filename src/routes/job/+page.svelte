<script>
  import { onMount } from 'svelte';
  import NavBar from '../../components/navigationBar.svelte';
  import JobApply from '../../components/jobApply.svelte';

</script>

<div class="flex items-start justify-center w-svw h-auto relative">
  <div class="w-auto sticky top-0 left-0">
    <NavBar />
  </div>
  <div class="w-full h-auto min-h-svh pt-8 pr-8 pb-8 overflow-x-auto">
    <div class="bg-[#FFFFFF] w-full h-auto min-h-svh rounded-[25px] p-8">
        <div class="bg-[#ffffff] w-full flex items-center justify-start space-x-2 rounded-t-[25px]">
          <img src="/assets/career-blossom-logo.png" class="w-10" alt="Career Blossom Inc. Logo" />
          <span class="text-[#DA478D] font-serif font-extrabold italic text-2xl">Career Blossom Inc.</span>
        </div>
        <JobApply />
    </div>
  </div>
</div>
