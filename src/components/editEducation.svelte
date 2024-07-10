<script>
    import { X, Plus, Info, Asterisk, CaretDoubleRight } from "phosphor-svelte";
    import { goto } from '$app/navigation';
    import { onMount, afterUpdate } from 'svelte';
    import { writable, get } from 'svelte/store';

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;
    let inputsEduc = writable([{ id: 1, schoolName: '', degreeType: '', yearStarted: '', yearEnded: '' }]);

    function addInputsEduc(event) {
        event.preventDefault();
        inputsEduc.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId, schoolName: '', degreeType: '', yearStarted: '', yearEnded: '' }];
        });
    }

    function removeInputsEduc(id) {
        inputsEduc.update(arr => arr.filter(input => input.id !== id));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const currentInputsEduc = get(inputsEduc);
        const payload = {
            candidateId: candidateUserInfo.candidate_id,
            educationRecords: currentInputsEduc.map(inputEduc => ({
                schoolName: inputEduc.schoolName,
                degreeType: inputEduc.degreeType,
                yearStarted: inputEduc.yearStarted,
                yearEnded: inputEduc.yearEnded || null,
            }))
        };

        console.log('Payload:', payload);

        const formData = new FormData();
        formData.append('candidateId', payload.candidateId);
        formData.append('educationRecords', JSON.stringify(payload.educationRecords));

        try {
            const response = await fetch('/api/insert_education', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Education records inserted successfully');
                goto('/register/candidate/education/work');
            } else {
                const errorText = await response.text();
                console.error('Error inserting education records:', errorText);
            }
        } catch (error) {
            console.error('Error inserting education records:', error);
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

        inputsEduc.update(arr => {
            if (arr.length === 0) {
                return [{ id: 1, schoolName: '', degreeType: '', yearStarted: '', yearEnded: '' }];
            }
            return arr;
        });
    });
</script>

    <form method="post" class="w-full flex flex-col items-center justify-center p-4" on:submit={handleSubmit}>
        <div class="flex items-center justify-between mt-12 w-full">
            <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
                <span>EDUCATION HISTORY DETAILS</span>
            </div>
            <button type="button" on:click={addInputsEduc} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
        </div>
        <div id="inputContainerEduc" class="w-full flex flex-col items-center justify-center overflow-auto">
            {#each $inputsEduc as inputEduc (inputEduc.id)}
                <div class="p-2 mt-6 rounded-[12px] bg-[#F8E0ED] w-full relative">
                    {#if inputEduc.id !== 1}
                        <button type="button" on:click={() => removeInputsEduc(inputEduc.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-4 -top-4"><X size={10} weight="bold" /></button>
                    {/if}
                    <div class="relative w-full">
                        <input type="text" bind:value={inputEduc.schoolName} placeholder="School Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                        <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                    </div>
                    
                    <div class="w-full flex items-center justify-between space-x-2 mt-3">
                        <div class="relative w-[45%]">
                            <select class="w-full p-4 rounded-[10px] text-gray-400" bind:value={inputEduc.degreeType} required>
                                <option disabled selected value="">Degree</option>
                                <option>High School</option>
                                <option>Associate</option>
                                <option>Bachelor</option>
                                <option>Master</option>
                                <option>PhD</option>
                                <option>Doctorate</option>
                                <option>Certificate</option>
                                <option>Other</option>
                              </select>
                              <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        <div class="relative w-[27%]">
                            <input type="text" bind:value={inputEduc.yearStarted} placeholder="Year Started" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required/>
                            <span class="absolute -top-1 -right-1 z-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                        </div>
                        
                        <input type="text" bind:value={inputEduc.yearEnded} placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]"/>
                    </div>
                </div>
            {/each}
        </div>

        <button type="button" class="font-semibold text-[#353535] bg-[#ffa7d2] text-[14px] mt-16 rounded-[5px] opacity-80 py-3 w-[175px] hover:opacity-100 " on:click={handleUpdate}>
            UPDATE
        </button>
    </form>
