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

<button class="semibold text-[#353535] font-semibold opacity-80 hover:opacity-100" on:click={handleLogout}>Logout</button>
