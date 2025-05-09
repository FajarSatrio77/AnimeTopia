// Function to handle navbar transparency on scroll
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const scrolled = window.scrollY > 20;
  if (scrolled) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// Check initial scroll position
document.addEventListener('DOMContentLoaded', handleNavbarScroll);

// Handle Astro page transitions
document.addEventListener('astro:after-swap', handleNavbarScroll);

// Clean up event listener on page transitions
document.addEventListener('astro:before-swap', () => {
  window.removeEventListener('scroll', handleNavbarScroll);
}); 