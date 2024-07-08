<script>
    import { onMount } from 'svelte';
    import NavBar from '../../components/navigationBar.svelte';
  
    let userInfo = {};
    let userInfoFetched = false;
  
    onMount(async () => {
      if (userInfoFetched) return;
  
      console.log('onMount called');
  
      const response = await fetch('/api/get_user_info');
      console.log('Response:', response);
  
      if (response.ok) {
        userInfo = await response.json();
        console.log('User info:', userInfo);
        userInfoFetched = true;
      } else {
        console.error('Failed to fetch user info');
      }
    });
  </script>
  
  <NavBar />
  <!-- {#if userInfo}
    <h1>Welcome, {userInfo.username}</h1>
    <p>Email: {userInfo.email}</p>
    <p>User Id: {userInfo.user_id}</p>
   
  {:else}
    <p>Loading...</p>
  {/if} -->