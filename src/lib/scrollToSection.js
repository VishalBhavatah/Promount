export const scrollToSection = (e, href, location, navigate, isMobileMenuOpen = false, setIsMobileMenuOpen = null) => {
  if (e) e.preventDefault();

  const performNavigation = () => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/', ''); // e.g., '#gallery'
      const targetId = hash.replace('#', ''); // e.g., 'gallery'

      // If we are NOT on the home page, navigate there first then scroll
      if (location && location.pathname !== '/') {
        navigate('/');
        // Wait for the home page to render, then scroll to the section
        setTimeout(() => {
          if (targetId === 'home' || targetId === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }
        }, 300);
        return;
      }

      // If we ARE on the home page, smoothly scroll to the element
      if (targetId === 'home' || targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } else {
      if (navigate) navigate(href);
    }
  };

  // Handle mobile menu closing before navigating/scrolling
  if (isMobileMenuOpen && setIsMobileMenuOpen) {
    setIsMobileMenuOpen(false);
    setTimeout(performNavigation, 300);
  } else {
    performNavigation();
  }
};