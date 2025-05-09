/**
 * Utility functions for authentication redirection
 */

// Pages that can be accessed without authentication
const PUBLIC_PAGES = ['/akun'];

/**
 * Check if the current page requires authentication
 * @param {string} pathname - The current pathname
 * @returns {boolean} - True if the page requires authentication
 */
export function requiresAuth(pathname) {
  // Check if the current page is in the public pages list
  return !PUBLIC_PAGES.some(page => pathname === page || pathname.startsWith(`${page}/`));
}

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if the user is authenticated
 */
export function isAuthenticated() {
  if (typeof localStorage === 'undefined') return false;
  
  try {
    const userData = localStorage.getItem('animetopia_user');
    return !!userData;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

/**
 * Redirect to login page if not authenticated
 * @param {string} pathname - The current pathname
 * @returns {void}
 */
export function redirectToLogin(pathname) {
  if (requiresAuth(pathname) && !isAuthenticated()) {
    // Add current URL as redirect parameter
    const redirectParam = encodeURIComponent(pathname);
    window.location.href = `/akun?redirect=${redirectParam}`;
  }
} 