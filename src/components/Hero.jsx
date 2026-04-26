import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import TrustBadge from '@/components/ui/TrustBadge';
import { Shield, Award, DollarSign, Tag, Clock, Tv } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const trustBadges = [
    { icon: Tv, text: "Starts at Just $29 — No Hidden Fees" },
    { icon: Tag, text: "$30 Discount on Orders Over $200" },
    { icon: Award, text: "1-Year Labor Warranty — We Stand Behind Our Work" },
    { icon: Shield, text: "$1M Insured — Your Home is Protected" },
    { icon: Clock, text: "Same-Day Service Available" },
    { icon: DollarSign, text: "Got 2+ TVs? Save Up to 20%" },
  ];

  const mobileBadges = [
    { text: <>Starts at just <strong>$29</strong></> },
    { text: <><strong>$30 off</strong> orders over $200</> },
    { text: <><strong>1-year</strong> warranty</> },
    { text: <><strong>$1M</strong> fully insured</> },
    { text: <><strong>Same-day</strong> service available</> },
    { text: <>Got 2+ TVs? Save up to <strong>20%</strong></> },
  ];

  return (
    <section id="home" className="relative min-h-fit flex items-start justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10" />
        <img
          src="https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/pexels-pu-ca-adryan-163345030-13051217-QCLEF.jpg"
          alt="Professional TV Installation"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">

          {/* 1. Heading */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional TV Mounting.{' '}
              <br />
              <span className="text-orange-500">On Any Wall</span> - Clean, Fast, and Hidden Wires.
              <br />
              <span className="text-orange-500">Call now</span><br />
              <a href="tel:9724303694" className="hover:text-orange-400 transition-colors">(972) 430-3694</a>
            </h1>
          </motion.div>

          {/* 2. Trust Badges — Card grid on desktop */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:grid grid-cols-3 gap-2 max-w-3xl mx-auto mb-8">
            {trustBadges.map((badge, index) => (
              <TrustBadge key={index} icon={badge.icon} text={badge.text} />
            ))}
          </motion.div>

          {/* 2. Trust Badges — 2-column list on mobile */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="md:hidden grid grid-cols-2 gap-x-4 gap-y-2 max-w-sm mx-auto mb-8">
            {mobileBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="8" fill="#ff6b35"/>
                  <path d="M4.5 8l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white text-xs text-left">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          {/* 3. CTA Button */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8">
            <CTAButton onClick={() => navigate('/booking')} size="lg" className="text-xl px-12 py-6">
              Book Now
            </CTAButton>
          </motion.div>

          {/* 4. Tagline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12">
            <p className="text-xl md:text-2xl text-white/90">
              Trusted by Your Neighbors. Loved by Your Living Room.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;