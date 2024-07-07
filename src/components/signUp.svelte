<script>
    import TCPP from './tcpp.svelte';
    import { goto } from '$app/navigation';
  
    let password = '';
    let confirmPassword = '';
    let passwordsMatch = true;
    let email = '';
    let username = '';
    let errorMessage = '';
    let formValid = false;
  
    $: passwordsMatch = password === confirmPassword;
    $: formValid = username && email && password && confirmPassword && passwordsMatch;
  
    async function handleSubmit(event) {
        event.preventDefault();
    
        const response = await fetch('/api/user_create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                username,
                email,
                password
            })
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            const userId = result.user_id;
            console.log(userId)

            goto('/register/candidate');
        } else {
            const error = await response.text();
            console.error(error);
            errorMessage = error;
        }
    }
</script>
  
<div class="w-[35%] mt-16 flex flex-col items-center justify-center">
    <form class="w-[525px] flex flex-col items-center justify-center" on:submit={handleSubmit}>
        <input type="email" placeholder="Email" class="mt-6 w-full p-4 rounded-[10px]" bind:value={email} required />
        <input type="text" placeholder="Username" class="mt-6 w-full p-4 rounded-[10px]" bind:value={username} required />
        <div class="w-full flex items-center justify-between space-x-4">
            <input type="password" placeholder="Password" class="mt-6 w-[50%] p-4 rounded-[10px]" bind:value={password} required />
            <input type="password" placeholder="Confirm Password" class="mt-6 w-[50%] p-4 rounded-[10px]" bind:value={confirmPassword} required />
        </div>
        {#if !passwordsMatch && confirmPassword !== ''}
            <div class="w-full h-[32px] flex flex-col items-end justify-center"><span class="text-[12px] font-semibold text-[#DA478D]">PASSWORDS DO NOT MATCH</span></div>
        {/if}
        {#if errorMessage}
            <div class="w-full h-[32px] flex flex-col items-end justify-center"><span class="text-[12px] font-semibold text-[#DA478D]">{errorMessage}</span></div>
        {/if}
        
            <TCPP />
        <button type="submit" class="mt-16 text-[#353535] font-semibold w-[225px] py-3 bg-[#F4B8DA] rounded-[50px] disabled:opacity-70" disabled={!formValid}>Sign Up</button>
    </form>
    <span class="mt-3">Already have an account? <button class="font-semibold" on:click={() => goto('/login')}>Login</button></span>
</div>
  