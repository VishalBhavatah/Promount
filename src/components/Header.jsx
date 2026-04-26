import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '@/lib/scrollToSection';

const defaultNavLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Reviews', href: '/#reviews' },
  { name: 'Services', href: '/#services' },
  { name: 'About Us', href: '/#about' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact Us', href: '/#contact' }
];

const Header = ({ navLinks = defaultNavLinks }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isBookingPage = location.pathname === '/booking';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    scrollToSection(e, href, location, navigate, isMobileMenuOpen, setIsMobileMenuOpen);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isBookingPage 
          ? 'bg-navy-950 shadow-xl py-1'
          : isScrolled 
            ? 'bg-navy-950/95 backdrop-blur-md shadow-xl py-1'
            : 'bg-navy-900/80 backdrop-blur-sm py-2'
      } border-b border-white/5`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 md:h-12">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
              PRO<span className="text-orange-500">Mount</span>USA
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-100 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all duration-200 font-medium cursor-pointer text-sm xl:text-base relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Call Now</span>
              <a href="tel:9724303694" className="text-white hover:text-orange-500 transition-colors font-bold text-lg flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                (972) 430-3694
              </a>
            </div>
            <a 
              href="/booking"
              onClick={(e) => { e.preventDefault(); navigate('/booking'); }}
              className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-full transition-all text-sm font-black uppercase tracking-wide shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 active:scale-95"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Right Side — Phone Icon + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a href="tel:9724303694" className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Call Us">
              <Phone className="w-6 h-6 text-orange-500" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-navy-950 border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/90 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-lg cursor-pointer block"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-6 mt-4 border-t border-white/10 space-y-6">
                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl">
                  <span className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">Available Today</span>
                  <a href="tel:9724303694" className="flex items-center space-x-3 text-white font-black text-2xl hover:text-orange-500 transition-colors">
                    <Phone className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                    <span>(972) 430-3694</span>
                  </a>
                </div>
                <a 
                  href="/booking"
                  onClick={(e) => { e.preventDefault(); navigate('/booking'); }}
                  className="flex w-full items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-5 rounded-2xl transition-all font-black uppercase tracking-widest shadow-xl shadow-orange-600/30"
                >
                  Book Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;