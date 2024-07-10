<script>
    import { onMount } from "svelte";
    import { Asterisk } from "phosphor-svelte";
  
    let jobList = [];
    let selectedJobId = '';
    let jobRole = '';
    let status = '';
    let description = '';
  
    let isDisabled = true;
    let isClearDisabled = true;
    let isDeleteDisabled = true;
  
    $: {
      if (selectedJobId || jobRole || status || description) {
        isClearDisabled = false;
      } else {
        isClearDisabled = true;
      }
    }
  
    $: {
      if (jobRole && status && description) {
        isDisabled = false;
      } else {
        isDisabled = true;
      }
    }

    $: {
    if (selectedJobId) {
      isDeleteDisabled = false;
    } else {
      isDeleteDisabled = true;
    }
  }
  
    function clearForm() {
      selectedJobId = '';
      jobRole = '';
      status = '';
      description = '';
    }
  
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('/api/insert_job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobId: selectedJobId,
                jobRole,
                status,
                description
            })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    console.log('Job successfully saved!');
                    clearForm();
                    location.reload();
                } else {
                    console.log('Failed to save job: ' + result.message);
                }
            } else {
                console.log('Failed to save job. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting job form:', error);
            console.log('An error occurred while submitting the form. Please try again.');
        }
    }

    async function handleDelete() {
    try {
      const response = await fetch('/api/delete_job', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: selectedJobId
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.log('Job successfully deleted!');
          clearForm();
          location.reload();
        } else {
          console.log('Failed to delete job: ' + result.message);
        }
      } else {
        console.log('Failed to delete job. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      console.log('An error occurred while deleting the job. Please try again.');
    }
  }

  
    async function getJobInfo(jobId) {
      try {
        const response = await fetch(`/api/get_job_list?jobId=${jobId}`);
        if (response.ok) {
          const jobInfo = await response.json();
          selectedJobId = jobInfo.job_id;
          jobRole = jobInfo.job_role;
          status = jobInfo.status;
          description = jobInfo.description;
        } else {
          console.error('Failed to fetch job info');
        }
      } catch (error) {
        console.error('Error fetching job info:', error);
      }
    }
  
    onMount(async () => {
      try {
        const response = await fetch('/api/get_job_list');
        if (response.ok) {
          jobList = await response.json();
        } else {
          console.error('Failed to fetch job list');
        }
      } catch (error) {
        console.error('Error fetching job list:', error);
      }
    });
  
    function getStatusText(status) {
      if (status === 'A') {
        return 'Available';
      } else if (status === 'NA') {
        return 'Not Available';
      } else {
        return status;
      }
    }
  
    function handleRowClick(jobId) {
      getJobInfo(jobId);
    }
  </script>
  
  <div class="w-full flex items-center justify-start mt-8 space-x-4">
    <div class="w-[40%] rounded-[10px] h-[495px]">
      <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D] mb-5">
        <span>JOB LISTS</span>
      </div>
      <div class="shadow pl-8 pt-8 pb-4 pr-4 flex flex-col rounded-[10px] h-[90%] border">
        <div class="flex items-center justify-between mb-2">
          <span class="w-[20%] font-semibold text-[14px] flex items-center justify-start">Job ID</span>
          <span class="w-[55%] font-semibold text-[14px] flex items-center justify-start">Role</span>
          <span class="w-[25%] font-semibold text-[14px] flex items-center justify-start">Status</span>
        </div>
        <div class="flex flex-col space-y-2 overflow-auto h-[90%] text-[14px]">
          {#if jobList.length > 0}
            {#each jobList as jl}
              <div class="w-full flex items-center justify-between cursor-pointer opacity-80 hover:opacity-90 hover:font-medium" on:click={() => handleRowClick(jl.job_id)}>
                <div class="w-[20%] flex flex-col items-start justify-start space-y-2">
                  <div class="w-full bg-[#FFFFFF] rounded-[10px] uppercase">{jl.job_id}</div>
                </div>
                <div class="w-[55%] flex flex-col items-start justify-start space-y-2">
                  <div class="w-full bg-[#FFFFFF] rounded-[10px] uppercase">{jl.job_role}</div>
                </div>
                <div class="w-[25%] flex flex-col items-start justify-start space-y-2">
                  <div class="w-full bg-[#FFFFFF] rounded-[10px] uppercase">{getStatusText(jl.status)}</div>
                </div>
              </div>
            {/each}
          {:else}
            <p class="mt-8">No jobs in the list.</p>
          {/if}
        </div>
      </div>
    </div>
    <form method="post" class="w-[60%] h-auto flex flex-col items-center justify-center p-8 bg-[#FFE9F5] rounded-[12px]" on:submit={handleSubmit}>
      <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D] mb-5">
        <span>JOB FORM</span>
      </div>
      <div class="w-full flex items-center justify-evenly space-x-2">
        <div class="relative w-[12%]">
          <input type="text" placeholder="Job ID" class="w-full rounded-[10px] p-4 hover:bg-[#FFF7F7]" value={selectedJobId} disabled />
        </div>
        <div class="relative w-[50%]">
          <input type="text" placeholder="Job Role" class="w-full rounded-[10px] p-4 hover:bg-[#FFF7F7]" required bind:value={jobRole} />
          <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
        <div class="relative w-[38%]">
          <select class="w-full p-4 rounded-[10px] text-gray-400" required bind:value={status}>
            <option disabled selected value="">Status</option>
            <option value="A">Available</option>
            <option value="NA">Not Available</option>
          </select>
          <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
        </div>
      </div>
      <div class="relative w-full mt-2">
        <textarea placeholder="Description" class="w-full h-[250px] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7] break-words overflow-auto resize-none" required bind:value={description}></textarea>
        <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
      </div>
      <div class="flex w-full items-center justify-end">
        <div class="flex items-center justify-between space-x-2">
          <div class="w-full flex mt-5 items-center justify-end">
            <button class="text-[#353535] font-semibold w-[125px] py-3 rounded-[10px] opacity-90 hover:opacity-100 disabled:opacity-30 transition-all" disabled={isClearDisabled} on:click={clearForm}>CLEAR</button>
          </div>
          <div class="w-full flex mt-5 items-center justify-end">
            <button class="text-[#353535] font-semibold w-[125px] py-3 bg-[#d3959f] rounded-[10px] opacity-90 hover:opacity-100 disabled:opacity-30 transition-all" disabled={isDeleteDisabled} on:click={handleDelete}>DELETE</button>
          </div>
          <div class="w-full flex mt-5 items-center justify-end">
            <button class="text-[#353535] font-semibold w-[125px] py-3 bg-[#F4B8DA] rounded-[10px] opacity-90 hover:opacity-100 disabled:opacity-30 transition-all" disabled={isDisabled}>SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  