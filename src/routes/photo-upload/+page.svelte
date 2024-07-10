<script>
    import { onMount } from 'svelte';
    import NavBar from '../../components/navigationBar.svelte';
    import { Asterisk, Info, Camera } from 'phosphor-svelte';

    let candidateUserInfo = {};
    let candidateUserInfoFetched = false;

    let photoUrl = '';
    let url = '';

    let previewSrc = "";
    let fileName = "No file chosen";

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                previewSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileName = "No file chosen";
            previewSrc = "";
        }
    }

    onMount(async () => {
        if (candidateUserInfoFetched) return;

        try {
            const response = await fetch('/api/get_candidate_user_info');

            if (response.ok) {
                candidateUserInfo = await response.json();
                candidateUserInfoFetched = true;
                url = candidateUserInfo.photo_url;
                photoUrl = url.replace(/^static\//, '/');;
            } else {
                console.error(`Failed to fetch candidate info: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    });
</script>


<div class="flex items-start justify-center w-svw h-auto relative">
    <div class="w-auto sticky top-0 left-0">
    <NavBar />
    </div>
    <div class="w-full h-auto min-h-svh pt-8 pr-8 pb-8 overflow-x-auto">
      <div class="bg-[#ffffff] w-full h-auto min-h-svh rounded-[25px] flex flex-col items-center justify-start">
            <div class="w-full flex items-center justify-start space-x-2 p-8 rounded-t-[25px]">
                <img src="/assets/career-blossom-logo.png" class="w-10" alt="Career Blossom Inc. Logo" />
                <span class="text-[#DA478D] font-serif font-extrabold italic text-2xl">Career Blossom Inc.</span>
            </div>
            <div class="w-full space-x-1 flex items-center justify-start font-semibold text-[#DA478D] pl-14">
                <span>UPLOAD PHOTO</span>
                <div class="dropdown dropdown-right dropdown-end space-x-1.5">
                    <div tabindex="0" role="button"><Info size={18} weight="bold" color="#CA5A90"/></div>
                    <div tabindex="0" class="dropdown-content">
                        <div class="bg-white w-[410px] rounded-[10px] shadow text-[14px] font-normal p-2">
                            The photo must be JPG format, clearly show your face, and be a professional square photo.
                        </div>
                    </div>
                </div>
            </div>
            <div class="avatar cursor-pointer" on:click={() => goto('/profile')}>
                <div class="w-96 rounded-full border-[40px] border-[#f0f0f0]">
                    {#if previewSrc}
                        <img src={previewSrc} alt="Photo Preview"required/>
                    {:else}
                        <img src="{photoUrl}" alt="Previous Profile" required/>
                    {/if}
                </div>
            </div>
            <form method="post" enctype="multipart/form-data" class="flex flex-col items-center justify-start">
                <div class="w-[525px] flex mt-10 p-2 bg-[#F8E0ED] rounded-[12px] relative">
                    <span class="absolute -top-1 -right-1"><Asterisk size={12} weight="bold" color="#DA478D" /></span>
                    <div class="flex flex-col w-full">
                        <div class="flex flex-row items-center w-full bg-white rounded-[10px] hover:bg-[#FFF7F7] cursor-pointer">
                            <input type="file" name="file" id="custom-input" accept="image/jpg" hidden on:change={handleFileChange} required/>
                            <label for="custom-input" class="block text-gray-400 p-4 rounded-md border-0 bg-[#eecddf] min-w-[150px] cursor-pointer hover:bg-[#ddb2ca] hover:text-[#353535]">
                                Choose photo
                            </label>
                            <span class="ml-4 text-gray-500 truncate">{fileName}</span>
                        </div>  
                    </div>
                </div>
                <button type="submit" class="text-[#353535] font-semibold w-[175px] py-3 bg-[#F4B8DA] rounded-[10px] opacity-90 hover:opacity-100 disabled:opacity-30 transition-all flex items-center justify-center mt-16" disabled={!previewSrc}>UPLOAD</button>
            </form>
        </div>
    </div>
</div>