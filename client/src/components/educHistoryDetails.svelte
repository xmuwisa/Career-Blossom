<script>
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
    });

    afterUpdate(() => {
        const scrollContainer = document.getElementById('inputContainerEduc');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    });

    function scrollToAddInput() {
        // Scroll to bottom when adding new input
        const scrollContainer = document.getElementById('inputContainerEduc');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
</script>

<div class="flex items-center justify-between mt-12 w-[525px]">
    <div class="flex items-center justify-start font-semibold text-[#DA478D]">
        EDUCATION HISTORY DETAILS
    </div> 
    <button on:click={addInputsEduc} class="bg-[#db78a8] text-white px-3 rounded-[5px] text-[16px] hover:bg-[#b95d8a]">+</button>
</div>

<div id="inputContainerEduc" class="w-[550px] flex flex-col items-center justify-center">
    {#each $inputsEduc as inputEduc (inputEduc.id)}
        <div class="p-2 mt-6 rounded-[12px] bg-[#F8E0ED] w-[525px] relative">
            {#if inputEduc.id !== 1} <!-- Ensure the first input can't be removed -->
                <button on:click={() => removeInputsEduc(inputEduc.id)} class="bg-[#db78a8] text-white px-2 p-1 rounded-[50px] text-[10px] font-semibold opacity-40 hover:bg-[#b95d8a] hover:opacity-100 absolute -right-2 -top-2">X</button>
            {/if}
            <input type="text" placeholder="School Name" class="w-full rounded-[10px] p-4 border-2 border-transparent hover:bg-[#FFF7F7]" />
            <div class="w-full flex items-center justify-between space-x-2 mt-3">
                <select class="w-[45%] p-4 rounded-[10px] text-gray-400">
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
</style>