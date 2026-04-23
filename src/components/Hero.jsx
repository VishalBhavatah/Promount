
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star, Calendar, Award } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';
import TrustBadge from '@/components/ui/TrustBadge';

const Hero = () => {
  const navigate = useNavigate();
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const benefits = ["Same-Day Service", "Fully Insured", "Expert Technicians", "Hidden Wires"];
  const trustBadges = [{
    icon: Award,
    text: "One Year Warranty"
  }, {
    icon: Star,
    text: "100's of 5 Star Reviews"
  }, {
    icon: Calendar,
    text: "Seven Days Service"
  }, {
    icon: Shield,
    text: "Insured Protection Guaranteed"
  }];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit(prev => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay for improved text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10" />
        <img src="https://horizons-cdn.hostinger.com/23419ec8-8982-4234-9a56-712b109f32dc/pexels-pu-ca-adryan-163345030-13051217-QCLEF.jpg" alt="Professional TV Installation" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Same Day Professional TV Mounting.{' '}
              <span className="text-orange-500">On Any Wall</span> - Clean, Fast, and Hidden Wires.
            </h1>
          </motion.div>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text mb-8">
            Serving the Dallas-Fort Worth Metroplex
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="mb-8">
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Trusted TV installers in your neighborhood — thousands of happy customers, not just opinions. Ask around, we’re the ones they recommend.
            </p>
            
            {/* Rotating Benefits */}
            <div className="h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={currentBenefit} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.5
              }} className="text-2xl md:text-3xl font-bold text-orange-500">
                  ✓ {benefits[currentBenefit]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mb-12">
            <CTAButton onClick={() => navigate('/booking')} size="lg" className="text-xl px-12 py-6">
              Get Your Price in 30 Seconds
            </CTAButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustBadges.map((badge, index) => <TrustBadge key={index} icon={badge.icon} text={badge.text} />)}
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;
