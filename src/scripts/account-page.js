// Account page functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get redirect parameter from URL if exists
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect');
  
  // Store redirect URL in a hidden input if present
  if (redirectUrl) {
    const redirectInput = document.getElementById('redirect-url');
    if (redirectInput) {
      redirectInput.value = redirectUrl;
    }
  }
  
  // Check if already logged in
  const userData = localStorage.getItem('animetopia_user');
  if (userData) {
    // If already logged in and there's a redirect URL, go there
    if (redirectUrl) {
      window.location.href = decodeURIComponent(redirectUrl);
      return;
    }
    
    // Otherwise show the profile card
    const profileCard = document.getElementById('profile-card');
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    
    if (profileCard && loginCard) {
      profileCard.classList.remove('hidden');
      loginCard.classList.add('hidden');
      if (registerCard) registerCard.classList.add('hidden');
      
      // Populate profile info
      try {
        const user = JSON.parse(userData);
        const displayName = user.displayName || user.nama || user.username || user.email.split('@')[0];
        
        const profileDisplayName = document.getElementById('profile-display-name');
        if (profileDisplayName) {
          profileDisplayName.textContent = displayName;
        }
        
        const profileEmail = document.getElementById('profile-email');
        if (profileEmail) {
          profileEmail.textContent = user.email;
        }
        
        const initial = document.getElementById('profile-initial');
        if (initial) {
          initial.textContent = displayName[0].toUpperCase();
        }
        
        // Get favorites count
        const key = `favorites_${user.uid}`;
        const favoritesData = localStorage.getItem(key);
        const favorites = favoritesData ? JSON.parse(favoritesData) : [];
        
        const favoritesCount = document.getElementById('favorites-count');
        if (favoritesCount) {
          favoritesCount.textContent = favorites.length;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }
  
  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const redirectInput = document.getElementById('redirect-url');
      const redirectAfterLogin = redirectInput ? redirectInput.value : '';
      
      try {
        // Simulating a login for demo purposes
        // Replace this with your actual login API call
        localStorage.setItem('animetopia_user', JSON.stringify({
          uid: `user_${Date.now()}`,
          email: email,
          displayName: email.split('@')[0]
        }));
        
        // Show success toast
        showToast('Login berhasil!', 'success');
        
        // Redirect to previous page or home after successful login
        setTimeout(() => {
          if (redirectAfterLogin) {
            window.location.href = decodeURIComponent(redirectAfterLogin);
          } else {
            window.location.href = '/';
          }
        }, 1000);
      } catch (error) {
        console.error('Login error:', error);
        const loginError = document.getElementById('login-error');
        if (loginError) {
          loginError.classList.remove('hidden');
        }
      }
    });
  }
  
  // Handle register form submission
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const username = document.getElementById('reg-username').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      
      try {
        // Simulating a registration for demo purposes
        localStorage.setItem('animetopia_user', JSON.stringify({
          uid: `user_${Date.now()}`,
          email: email,
          displayName: username
        }));
        
        // Show success toast
        showToast('Pendaftaran berhasil!', 'success');
        
        // Redirect to home page after successful registration
        setTimeout(() => {
          // Use the redirect URL if available
          const redirectInput = document.getElementById('redirect-url');
          const redirectAfterLogin = redirectInput && redirectInput.value 
            ? decodeURIComponent(redirectInput.value)
            : '/';
            
          window.location.href = redirectAfterLogin;
        }, 1000);
      } catch (error) {
        console.error('Registration error:', error);
        const registerError = document.getElementById('register-error');
        if (registerError) {
          registerError.classList.remove('hidden');
        }
      }
    });
  }
  
  // Handle logout button
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Get current user to clear their specific data
      let userId = null;
      try {
        const userData = localStorage.getItem('animetopia_user');
        if (userData) {
          const user = JSON.parse(userData);
          userId = user.uid;
        }
      } catch (error) {
        console.error('Error getting user ID for logout:', error);
      }
      
      // Clear all user-specific data
      localStorage.removeItem('animetopia_user');
      
      // Clear favorites and history if we have a userId
      if (userId) {
        localStorage.removeItem(`favorites_${userId}`);
        localStorage.removeItem(`watchHistory_${userId}`);
      }
      
      showToast('Logout berhasil!', 'success');
      
      // Refresh the page after logout
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  
  // Toggle between login and register forms
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  
  if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('login-card').classList.add('hidden');
      document.getElementById('register-card').classList.remove('hidden');
    });
  }
  
  if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('register-card').classList.add('hidden');
      document.getElementById('login-card').classList.remove('hidden');
    });
  }
});

// Function to show toast notifications
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
  toast.innerHTML = `
    <div>
      <span>${message}</span>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
} 