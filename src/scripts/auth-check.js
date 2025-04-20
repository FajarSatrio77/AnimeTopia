// List of paths that do not require authentication
const publicPaths = ['/akun', '/login', '/register'];

// Paths to ignore (no need to check auth)
const ignorePaths = ['/404', '/500'];

// Track if we're currently redirecting to avoid multiple redirects
let isRedirecting = false;

// Check if current page requires authentication
function requiresAuth(pathname) {
  // Don't require auth for public paths
  if (publicPaths.some(path => 
    pathname === path || 
    pathname.startsWith(`${path}/`)
  )) {
    return false;
  }
  
  // Don't check auth for ignored paths
  if (ignorePaths.some(path => 
    pathname === path || 
    pathname.startsWith(`${path}/`)
  )) {
    return false;
  }
  
  // Don't require auth for static assets
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|css|js|woff|woff2|ttf|eot)$/i)) {
    return false;
  }
  
  // All other paths require auth
  return true;
}

// Check if user is logged in
function isAuthenticated() {
  try {
    const userData = localStorage.getItem('animetopia_user');
    if (!userData) return false;
    
    // Parse the data to ensure it's valid
    const user = JSON.parse(userData);
    return !!user && !!user.uid;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

// Redirect to login page if not authenticated
function redirectIfNotAuthenticated() {
  // Avoid redirecting if we're already in the process
  if (isRedirecting) return;
  
  const currentPath = window.location.pathname;
  
  // If this is a path that requires auth and user is not logged in
  if (requiresAuth(currentPath) && !isAuthenticated()) {
    console.log('User not authenticated, redirecting to login page');
    
    // Mark that we're redirecting to prevent duplicate redirects
    isRedirecting = true;
    
    // Include the full URL (path + query) in the redirect
    const fullUrl = currentPath + window.location.search + window.location.hash;
    const redirectUrl = encodeURIComponent(fullUrl);
    
    // Redirect to login page
    window.location.href = `/akun?redirect=${redirectUrl}`;
  }
}

// Clear redirect flag when the page finishes loading
window.addEventListener('load', () => {
  isRedirecting = false;
});

// Only check once when the page is first loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!isRedirecting) redirectIfNotAuthenticated();
  });
} else {
  if (!isRedirecting) redirectIfNotAuthenticated();
}

// Check authentication after view transitions
document.addEventListener('astro:page-load', () => {
  isRedirecting = false;
  setTimeout(() => {
    if (!isRedirecting) redirectIfNotAuthenticated();
  }, 100);
});

document.addEventListener('astro:after-swap', () => {
  isRedirecting = false;
  setTimeout(() => {
    if (!isRedirecting) redirectIfNotAuthenticated();
  }, 100);
});

console.log('Auth check script loaded'); 