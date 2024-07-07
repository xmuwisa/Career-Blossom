<script>
    import { goto } from '$app/navigation';
  
    async function handleLogout() {
      try {
        const response = await fetch('/api/user_logout', {
          method: 'POST',
          credentials: 'include'
        });
  
        if (response.ok) {
          goto('/login');
        } else {
          console.error('Failed to logout:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  </script>
  
  <button class="btn" on:click={handleLogout}>Logout</button>