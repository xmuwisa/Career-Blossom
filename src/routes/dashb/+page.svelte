<script>
  import { writable } from 'svelte/store';
  import { onMount } from "svelte";
  import NavBar from '../../components/navigationBar.svelte';

  const statisticsStore = writable(null);
  let loading = true;

  onMount(async () => {
      try {
          const res = await fetch('/api/get_application_stats');
          if (res.ok) {
              const statistics = await res.json();
              statisticsStore.set(statistics);
              loading = false;
          } else {
              console.error('Failed to fetch statistics:', res.status, res.statusText);
          }
      } catch (error) {
          console.error('Error fetching statistics:', error);
      }
  });

  let statistics;
  $: statistics = $statisticsStore;
</script>

<div class="flex items-start justify-center w-svw h-auto relative">
  <div class="w-auto sticky top-0 left-0">
    <NavBar />
  </div>
  <div class="w-full h-svh pt-8 pr-8 pb-8 overflow-x-auto">
    <div class="bg-[#FFFFFF] w-full h-auto min-h-svh rounded-[25px] p-8">
        <div class="bg-[#ffffff] w-full flex items-center justify-start space-x-2 rounded-t-[25px]">
          <img src="/assets/career-blossom-logo.png" class="w-10" alt="Career Blossom Inc. Logo" />
          <span class="text-[#DA478D] font-serif font-extrabold italic text-2xl">Career Blossom Inc.</span>
        </div>

        {#if loading}
          <p>Loading...</p>
        {/if}
        {#if statistics}
          <div class="w-full h-[450px] flex items-center justify between mt-16 space-x-4">
            <div class="flex flex-col items-center justify-between w-[50%] space-y-6">  
              <div class="flex flex-col items-center justify-start p-8 shadow-xl text-5xl w-full rounded-[25px]">
                <span class="text-3xl font-bold">TOTAL APPLICATIONS</span>
                <span class="text-[100px] font-semibold text-[#DA478D] pt-4">{statistics.totalApplications}</span>
              </div>
              <div class="flex flex-col items-center justify-start p-8 shadow-xl text-5xl w-full rounded-[25px]">
                <span class="text-3xl font-bold flex items-center">CANDIDATE AVERAGE APPLICATIONS</span>
                <span class="text-[100px] font-semibold text-[#DA478D] pt-4">{statistics.avgApplicationsPerCandidate}</span>
              </div>
            </div>
            <div class="w-[50%] h-full shadow-xl flex-col flex items-center justify-start p-8 rounded-[25px]">
              <span class="text-3xl font-bold flex items-center pt-6">TOP 5 JOBS WITH MOST APPLICATIONS</span>
              <div class="w-[70%] h-[80%] flex flex-col items-center justify-between pt-8">
                {#each statistics.topJobs as job}
                <div class="flex items-center justify-between w-full">
                  <span class="text-[30px]">{job.job_role}</span>
                  <span class="text-[35px] font-semibold text-[#DA478D] ">{job.count}</span>
                </div>
                {/each}
              </div>
            </div>
          </div> 

          <div class="w-full flex items-center justify-between space-x-4 mt-4">
            <div class="w-[50%] flex flex-col items-center justify-center shadow-xl p-8 pt-16 rounded-[25px]">
              <span class="font-semibold text-2xl opacity-50">Application Status</span>
              <div class="flex items-center justify-around space-x-12">
                {#each statistics.applicationStatusStats as stat}
                <div class="w-full flex flex-col items-center justify-center mt-4">
                  <span class="flex items=center justify-center w-[150px] text-4xl font-bold">
                    {#if stat.application_status === 'P'}
                        PENDING
                      {:else if stat.application_status === 'A'}
                        ACCEPTED
                      {:else if stat.application_status === 'R'}
                        REJECTED&nbsp;
                    {/if}
                  </span>
                  <span class="flex items=center justify-center w-[150px] text-[100px] font-semibold"
                    class:text-[#81BAE1]={stat.application_status === 'P'}
                    class:text-[#97E181]={stat.application_status === 'A'}
                    class:text-[#E18181]={stat.application_status === 'R'}
                  >{stat.app_count}
                </span>
                </div>
                {/each}
              </div>
            </div>

            <div class="w-[50%] flex flex-col items-center justify-center shadow-xl p-8 pt-16 rounded-[25px]">
              <span class="font-semibold text-2xl opacity-50">Employment Status</span>
              <div class="w-full flex items-center justify-around ">
                {#each statistics.employmentTypeStats as stat}
                <div class="w-full flex flex-col items-center justify-between mt-4">
                  <span class="flex w-full items=center justify-center text-4xl font-bold">
                    {#if stat.employment_type === 'FT'}
                      FULL-TIME
                    {:else if stat.employment_type === 'PT'}
                      PART-TIME
                    {:else if stat.employment_type === 'C'}
                      CONTRACT
                    {/if}
                  </span>
                  <span class="flex items=center justify-center w-[150px] text-[100px] text-[#DA478D] font-semibold">{stat.emp_count}</span>
                </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>
  </div>
</div>
          