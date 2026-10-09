window.addEventListener('scroll', function() {
  const heroSection = document.querySelector('.hero-section');
  const infoSection = document.querySelector('#info-section');
  
  // Get the height of the hero section
  const heroHeight = heroSection.offsetHeight;
  
  // Get the current scroll position
  const scrollPosition = window.scrollY;
  
  // Check if the user has scrolled past the hero section
  if (scrollPosition > heroHeight) {
      // Scroll to the info section
      infoSection.scrollIntoView({ behavior: 'smooth' });
  }
});