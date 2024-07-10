<script>
    import { X, Plus, Info, Asterisk, CaretDoubleRight } from "phosphor-svelte";
    import { goto } from '$app/navigation';
    import { onMount, afterUpdate } from 'svelte';
    import { writable, get } from 'svelte/store';

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;
    let inputsWork = writable([{ id: 1, jobRole: '', company: '', yearStarted: '', yearEnded: '' }]);

    function addInputsWork(event) {
        event.preventDefault();
        inputsWork.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId, jobRole: '', company: '', yearStarted: '', yearEnded: '' }];
        });
    }

    function removeInputsWork(id) {
        inputsWork.update(arr => {
            return arr.filter(input => input.id !== id);
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const currentInputsWork = get(inputsWork); // Use $inputsWork to directly access the store value
        const payload = {
            candidateId: candidateUserInfo.candidate_id,
            workRecords: currentInputsWork.map(inputWork => ({
                jobRole: inputWork.jobRole,
                company: inputWork.company,
                yearStarted: inputWork.yearStarted,
                yearEnded: inputWork.yearEnded || null,
            }))
        };

        const formData = new FormData();
        formData.append('candidateId', payload.candidateId);
        formData.append('workRecords', JSON.stringify(payload.workRecords));

        try {
            const response = await fetch('/api/insert_work', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Work records inserted successfully');
                goto('/job'); // Redirect on successful submission
            } else {
                console.error('Error inserting work records:', response.statusText);
            }
        } catch (error) {
            console.error('Error inserting work records:', error);
        }
    }

    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
                candidateUserInfoFetched = true;
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });
</script>


        <form method="post" class="w-full flex flex-col items-center justify-center p-4" on:submit={handleSubmit}>
            <div class="flex items-center justify-between mt-12 w-full">
                <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                    <span>WORK HISTORY DETAILS</span>
                    <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                        <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                        <div tabindex="0" class="dropdown-content">
                            <div class="bg-white w-[293px] rounded-[10px] shadow text-[14px] font-normal p-2">
                                Add a work background if there is any.
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" on:click={addInputsWork} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
            </div>
            
            <div id="inputContainerWork" class="w-full flex flex-col items-center justify-center">
                {#each $inputsWork as inputWork (inputWork.id)}
                    <div class="w-full p-2 mt-6 rounded-[12px] bg-[#F8E0ED] relative">
                        <button type="button" on:click={() => removeInputsWork(inputWork.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-4 -top-4"><X size={10} weight="bold" /></button>
                        <div class="relative w-full">
                            <input type="text" bind:value={inputWork.jobRole} placeholder="Job Role" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                            <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        <div class="w-full flex items-center justify-between space-x-2 mt-3">
                            <div class="relative w-[45%]">
                                <input type="text" bind:value={inputWork.company} placeholder="Company Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                                <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                            </div>
                            <div class="relative w-[27%]">
                                <input type="text" bind:value={inputWork.yearStarted} placeholder="Year Started" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                                <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                            </div>
                            <input type="text" bind:value={inputWork.yearEnded} placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
                        </div>
                    </div>
                {/each}
            </div>

            <button type="button" class="font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] mt-16 rounded-[5px] opacity-80 py-3 w-[175px] hover:opacity-100 " on:click={handleUpdate}>
                UPDATE
            </button>
        </form>