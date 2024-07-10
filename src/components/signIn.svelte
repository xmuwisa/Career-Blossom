<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let formValid = false;
  let error = '';

  $: formValid = username && password;

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch('/api/user_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username,
        password
      }),
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      const userId = result.user_id;
      const candidateId = result.candidate_id;
      console.log(`User ID: ${userId} logged in successfully! Candidate ID: ${candidateId}`);

      goto('/job');
    } else {
      const error = await response.text();
      console.error(`Error logging in: ${error}`);
    }
  }
</script>

<div class="w-[35%] mt-16 flex flex-col items-center justify-center">
  <form class="w-[525px] flex flex-col items-center justify-center" on:submit={handleLogin}>
    <input type="text" placeholder="Username" class="mt-6 w-full p-4 rounded-[10px]" bind:value={username} required/>
    <input type="password" placeholder="Password" class="mt-6 w-full p-4 rounded-[10px]" bind:value={password} required/>
    <div class="w-full h-[32px] flex flex-col items-end justify-center"><span class="text-[12px] font-semibold text-[#DA478D]">{error}</span></div>
    <button type="submit" class="mt-16 text-[#353535] font-semibold w-[225px] py-3 bg-[#F4B8DA] rounded-[50px] disabled:opacity-70 transition-all" disabled={!formValid}>Sign In</button>
  </form>
  <span class="mt-3">Don't have an account? <button class="font-semibold" on:click={() => goto('/register')}>Register</button></span>
</div>