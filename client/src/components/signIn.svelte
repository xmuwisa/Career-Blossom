<script>
    import { goto } from '$app/navigation';
</script>

<div class="w-[35%] mt-16 flex flex-col items-center justify-center">
    <form class="w-[525px] flex flex-col items-center justify-center">
        <input type="text" placeholder="Username" class="mt-6 w-full p-4 rounded-[10px]" required/>
        <input type="password" placeholder="Password" class="mt-6 w-full p-4 rounded-[10px]" required/>
        <!-- dont forget forgot password component here -->
        <div class="mt-4 w-full flex items-center justify-end text-[14px] font-semibold">
            <p>Forgot password?</p>
        </div>
        <button class="mt-16 text-[#353535] font-semibold w-[225px] py-3 bg-[#F4B8DA] rounded-[50px]">Sign In</button>
    </form>
    <span class="mt-3">Don't have an account? <button class="font-semibold" on:click={() => goto('/register')}>Register</button></span>
</div>