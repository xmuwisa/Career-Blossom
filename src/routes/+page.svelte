<script>
    import { goto } from '$app/navigation';
</script>

<div class="w-svw h-svh flex flex-col items-center justify-center border">
    <div class="bg-[#FFFFFF] w-[95%] h-[95%] rounded-[35px] flex flex-col items-center justify-center">
        <div class="w-full flex flex-col items-center justify-center space-y-32 text-center">
            <div class="flex flex-col items-center justify-center">
                <img src="/assets/career-blossom-logo.png" class="w-44" alt="Career Blossom Inc. Logo" />
                <span class="text-[#DA478D] font-serif font-extrabold italic text-5xl">Career Blossom Inc.</span>
            </div>
            <div class="flex flex-col items-center justify-center">
                <span class="text-[#353535] font-sans font-bold text-2xl">Get Started</span>
                <span class="text-[#353535] font-sans text-[22px]">Let your experience bloom by registering and signing in!</span>
            </div>
        </div>
        <div class="font-sans font-semibold flex items-center justify-center space-x-5 mt-20">
            <button class="text-[#353535] w-[225px] py-3 bg-[#F4B8DA] rounded-[50px]" on:click={() => goto('/register')}>Sign Up</button>
            <button class="text-[#353535] w-[225px] py-3 bg-[#F4B8DA] rounded-[50px]" on:click={() => goto('/login')}>Sign In</button>
        </div>
    </div>
</div>