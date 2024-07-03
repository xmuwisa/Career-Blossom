<script>
    import SignIn from '../../components/signIn.svelte';

</script>

<div class="w-full h-full rounded-[35px] p-20 flex flex-col items-center justify-center">
    <div class="w-full flex flex-col items-center justify-center space-y-6 text-center">
        <div class="flex flex-col items-center justify-center">
            <img src="../src/lib/assets/career-blossom-logo.png" class="w-32" alt="Career Blossom Inc. Logo" />
            <span class="text-[#DA478D] font-serif font-extrabold italic text-4xl">Career Blossom Inc.</span>
        </div>
        <span class="text-[#353535] font-sans text-xl">Welcome back! Let's continue your blooming career.</span>
    </div>
    <SignIn />
</div>