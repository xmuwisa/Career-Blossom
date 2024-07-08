<script>
    import SignUpAdmin from '../../components/signUpAdmin.svelte';
    import { goto } from '$app/navigation';
</script>


<div class="w-full h-full rounded-[35px] p-20 flex flex-col items-center justify-center">
    <div class="w-full flex flex-col items-center justify-center space-y-6 text-center">
        <div class="flex flex-col items-center justify-center">
            <img src="/assets/career-blossom-logo.png" class="w-32 cursor-pointer" alt="Career Blossom Inc. Logo" on:click={() => goto('/')}/>
            <span class="text-[#DA478D] font-serif font-extrabold italic text-4xl">Career Blossom Inc.</span>
        </div>
        <span class="text-[#353535] font-sans text-xl">Join us and start your journey towards a blooming career.</span>
    </div>
    <SignUpAdmin />
</div>
