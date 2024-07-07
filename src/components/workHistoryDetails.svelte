<!-- <script>
    import { X, Plus } from "phosphor-svelte";
    import { onMount, afterUpdate } from 'svelte';
    import { writable } from 'svelte/store';

    let inputsWork = writable([{ id: 1 }]);

    function addInputsWork(event) {
        event.preventDefault();
        inputsWork.update(arr => {
            const nextId = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
            return [...arr, { id: nextId }];
        });
        scrollToAddInput();
    }

    function removeInputsWork(id) {
        inputsWork.update(arr => {
            return arr.filter(input => input.id !== id);
        });
    }

    onMount(() => {
        inputsWork.update(arr => {
            if (arr.length === 0) {
                return [{ id: 1 }];
            }
            return arr;
        });
    });

    afterUpdate(() => {
        const scrollContainer = document.getElementById('inputContainerWork');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    });

    function scrollToAddInput() {
        const scrollContainer = document.getElementById('inputContainerWork');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
</script>

<div class="flex items-center justify-between mt-12 w-[525px]">
    <div class="flex items-center justify-start font-semibold text-[#DA478D]">
        WORK HISTORY DETAILS
    </div> 
    <button on:click={addInputsWork} class="bg-[#db78a8] text-white px-3 py-2 rounded-[5px] hover:bg-[#b95d8a]"><Plus size={14} weight="bold" /></button>
</div>

<div id="inputContainerWork" class="w-[550px] flex flex-col items-center justify-center">
    {#each $inputsWork as inputWork (inputWork.id)}
        <div class="w-[525px] p-2 mt-6 rounded-[12px] bg-[#F8E0ED] relative">
            {#if inputWork.id !== 1}
                <button on:click={() => removeInputsWork(inputWork.id)} class="bg-[#db78a8] text-white p-2 rounded-[50px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-2 -top-2"><X size={10} weight="bold" /></button>
            {/if}
            <input type="text" placeholder="Job Role" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
            <div class="w-full flex items-center justify-between space-x-2 mt-3">
                <input type="text" placeholder="Company Name" class="w-[45%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
                <input type="text" placeholder="Year Started" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
                <input type="text" placeholder="Year Ended" class="w-[27%] rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
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