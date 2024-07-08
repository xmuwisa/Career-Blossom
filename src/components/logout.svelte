<script>
  import { goto } from '$app/navigation';

  async function handleLogout() {
    try {
      const response = await fetch('/api/user_logout', {
        method: 'POST'
      });

      if (response.ok) {
        console.log('Logged out successfully');
        goto('/'); // Redirect to home or login page
      } else {
        // Handle errors here
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
</script>

<button class="semibold text-[#353535] text-[14px] font-semibold bg-[#F4B8DA] rounded-[10px] opacity-90 hover:opacity-100 px-10 py-3 " on:click={handleLogout}>Logout</button>
