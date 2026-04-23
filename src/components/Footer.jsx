import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, Info } from 'lucide-react';
import { SiTiktok, SiYelp, SiThumbtack, SiPinterest } from 'react-icons/si';

const Footer = () => {
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const navigate = useNavigate();

  const footerLinks = {
    'Services': [{
      label: 'TV Mounting',
      targetId: 'services'
    }, {
      label: 'Fireplace Installation',
      targetId: 'services'
    }, {
      label: 'Soundbar Mounting',
      targetId: 'services'
    }, {
      label: 'Home Theater Setup',
      targetId: 'services'
    }, {
      label: 'Commercial Installation',
      targetId: 'services'
    }],
    'Company': [{
      label: 'About Us',
      targetId: 'about'
    }, {
      label: 'Reviews',
      targetId: 'reviews'
    }, {
      label: 'Gallery',
      targetId: 'gallery'
    }, {
      label: 'FAQ',
      targetId: 'faq'
    }, {
      label: 'Contact',
      targetId: 'contact'
    }],
    'Support': [{
      label: 'Warranty Information',
      targetId: 'contact-section',
      tooltip: "Lifetime warranty on our brackets. 1-year warranty on the labor on all installations."
    }, {
      label: 'Service Areas',
      targetId: 'contact-section',
      tooltip: "We service the following counties in Texas: Collin, Dallas, Denton, Rockwall, and Tarrant."
    }, {
      label: 'Privacy Policy',
      href: '/privacy'
    }, {
      label: 'Terms of Service',
      href: '/terms'
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    name: 'Facebook',
    link: '#'
  }, {
    icon: Instagram,
    name: 'Instagram',
    link: '#'
  }, {
    icon: SiTiktok,
    name: 'TikTok',
    link: '#'
  }, {
    icon: Youtube,
    name: 'YouTube',
    link: '#'
  }, {
    icon: SiYelp,
    name: 'Yelp',
    link: '#'
  }, {
    icon: SiThumbtack,
    name: 'Thumbtack',
    link: '#'
  }, {
    icon: SiPinterest,
    name: 'Pinterest',
    link: '#'
  }, {
    icon: Twitter,
    name: 'X',
    link: '#'
  }];

  const handleLinkClick = (e, link) => {
    // If the link has an href, let React Router Link handle it or handle it directly
    if (link.href) {
      return;
    }

    e.preventDefault();

    // If we are not on the home page and need to scroll, navigate to home first
    if (window.location.pathname !== '/' && link.targetId) {
      navigate(`/#${link.targetId}`);
      // The actual scroll will be handled after navigation if implemented, or user just gets to home
      return;
    }

    if (!link.targetId) return;
    const element = document.getElementById(link.targetId);
    if (element) {
      const offset = 80; // Adjust for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSocialClick = e => {
    e.preventDefault();
  };

  return <footer className="bg-navy-950 pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="mb-6">
              <span className="text-3xl font-bold text-white">
                PRO<span className="text-orange-500">Mount</span>USA
              </span>
            </motion.div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Professional TV mounting and installation services. Same-day appointments, expert technicians, and complete satisfaction guaranteed.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-white/80">
                <Phone className="w-5 h-5 text-orange-500 mr-3" />
                <span>(972) 430-3694</span>
              </div>
              <div className="flex items-center text-white/80">
                <Mail className="w-5 h-5 text-orange-500 mr-3" />
                <span>info@promountusa.com</span>
              </div>
              <div className="flex items-center text-white/80">
                <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                <span>Serving Dallas–Fort Worth Metroplex Area</span>
              </div>
            </div>

            {/* Social Links in Footer */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => <a key={index} href="#" onClick={handleSocialClick} className="bg-white/5 hover:bg-orange-500/20 text-white/80 hover:text-orange-500 p-2.5 rounded-full transition-all duration-300 border border-white/10 hover:border-orange-500 cursor-default" aria-label={social.name}>
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], index) => <motion.div key={title} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }}>
              <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, idx) => {
              const tooltipId = `${title}-${idx}`;
              return <li key={idx} className="relative">
                      <div className="inline-flex items-center" onMouseEnter={() => link.tooltip && setHoveredTooltip(tooltipId)} onMouseLeave={() => link.tooltip && setHoveredTooltip(null)}>
                        {link.href ? (
                          <Link to={link.href} className="text-white/70 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.targetId ? `#${link.targetId}` : '#'} onClick={e => handleLinkClick(e, link)} className="text-white/70 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                            {link.label}
                          </a>
                        )}
                        
                        {link.tooltip && <div className="ml-2 cursor-help relative flex items-center">
                            <Info className="w-4 h-4 text-white/50 hover:text-orange-500 transition-colors" />
                          </div>}
                      </div>

                      <AnimatePresence>
                        {link.tooltip && hoveredTooltip === tooltipId && <motion.div initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }} exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95
                  }} transition={{
                    duration: 0.2
                  }} className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-white/10 z-50 pointer-events-none">
                            {link.tooltip}
                            <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900" />
                          </motion.div>}
                      </AnimatePresence>
                    </li>;
            })}
              </ul>
            </motion.div>)}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © 2026 PROMountUSA All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;