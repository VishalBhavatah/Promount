export const scrollToSection = (e, href, location, navigate, isMobileMenuOpen = false, setIsMobileMenuOpen = null) => {
  if (e) e.preventDefault();
  
  const performNavigation = () => {
    // Check if it's an anchor link for the home page
    if (href.startsWith('/#')) {
      const hash = href.replace('/', ''); // Extract just the hash, e.g., '#services'
      
      // If we are NOT on the home page, navigate to the home page with the hash
      if (location && location.pathname !== '/') {
        navigate(href);
        return;
      }
      
      // If we ARE on the home page, smoothly scroll to the element
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        const offset = 80; // Header height offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (hash === '#home' || hash === '') {
        // Fallback to top if it's home
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Standard navigation for non-anchor links
      if (navigate) navigate(href);
    }
  };

  // Handle mobile menu closing before navigating/scrolling
  if (isMobileMenuOpen && setIsMobileMenuOpen) {
    setIsMobileMenuOpen(false);
    // Wait for the menu closing animation
    setTimeout(performNavigation, 300);
  } else {
    performNavigation();
  }
};