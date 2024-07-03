<script>
    import { goto } from '$app/navigation';
</script>

<div class="w-[35%] mt-16 flex flex-col items-center justify-center">
    <form class="w-[525px] flex flex-col items-center justify-center">
        <input type="email" placeholder="Email" class="mt-6 w-full p-4 rounded-[10px]" required/>
        <input type="text" placeholder="Username" class="mt-6 w-full p-4 rounded-[10px]" required/>
        <div class="w-full flex items-center justify-between space-x-4">
            <input type="password" placeholder="Password" class="mt-6 w-[50%] p-4 rounded-[10px]" required/>
            <input type="password" placeholder="Confirm Password" class="mt-6 w-[50%] p-4 rounded-[10px]" required/>
        </div>
        <div class="w-full flex item-center justify-end">
            <button class="mt-6 text-[#353535] font-semibold w-[175px] py-3 bg-[#F4B8DA] rounded-[10px]">Next</button>
        </div>
    </form>
    <span class="mt-16">Already have an account? <button class="font-semibold" on:click={() => goto('/login')}>Login</button></span>
</div>