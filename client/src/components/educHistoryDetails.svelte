<!-- <script>
    import { X, Plus, Asterisk, Info } from "phosphor-svelte";
    import { onMount, afterUpdate } from 'svelte';
    import { writable } from 'svelte/store';

    let inputsEduc = writable([{ id: 1 }]);

    function addInputsEduc(event) {
        event.preventDefault();
        inputsEduc.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId }];
        });
        scrollToAddInput();
    }

    function removeInputsEduc(id) {
        inputsEduc.update(arr => {
            return arr.filter(input => input.id !== id);
        });
    }

    onMount(() => {
        inputsEduc.update(arr => {
            if (arr.length === 0) {
                return [{ id: 1 }];
            }
            return arr;
        });

        inputsWork.update(arr => {
            if (arr.length === 0) {
                return [{ id: 1 }];
            }
            return arr;
        });
    });

    afterUpdate(() => {
        const scrollContainer = document.getElementById('inputContainerEduc');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    });

    function scrollToAddInput() {
        const scrollContainer = document.getElementById('inputContainerEduc');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
</script>

<div class="flex items-center justify-between mt-12 w-[525px]">
    <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D]">
        <span>EDUCATION HISTORY DETAILS</span>
        <div class="dropdown dropdown-right dropdown-end space-x-1.5">
            <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
            <div tabindex="0" class="dropdown-content">
                <div class="bg-white w-[250px] bg-white rounded-[10px] shadow text-[14px] font-normal p-2">
                    Must provide at least one (1) educational background.
                </div>
            </div>
        </div>
    </div>
    <button on:click={addInputsEduc} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
</div>

<div id="inputContainerEduc" class="w-[550px] flex flex-col items-center justify-center overflow-auto">
    {#each $inputsEduc as inputEduc (inputEduc.id)}
        <div class="p-2 mt-6 rounded-[12px] bg-[#F8E0ED] w-[525px] relative">
            {#if inputEduc.id === 1}
                <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
            {/if}
            {#if inputEduc.id !== 1} 
                <button on:click={() => removeInputsEduc(inputEduc.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-2 -top-2"><X size={10} weight="bold" /></button>
            {/if}
            <input type="text" placeholder="School Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required={inputEduc.id === 1} />
            <div class="w-full flex items-center justify-between space-x-2 mt-3">
                <select class="w-[45%] p-4 rounded-[10px] text-gray-400" required={inputEduc.id === 1}>
                    <option disabled selected>Degree</option>
                    <option>High School</option>
                    <option>Associate</option>
                    <option>Bachelor</option>
                    <option>Master</option>
                    <option>PhD</option>
                    <option>Doctorate</option>
                    <option>Certificate</option>
                    <option>Other</option>
                </select>
                <input type="text" placeholder="Year Started" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required={inputEduc.id === 1}/>
                <input type="text" placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" required={inputEduc.id === 1}/>
            </div>
        </div>
    {/each}
</div>

<style>
    #inputContainer{
        @apply overflow-auto;
    }

    input {
        @apply rounded-[10px] p-4 border-2 border-transparent;
    }

    input:hover {
        @apply bg-[#FFF7F7];
    }
</style> -->