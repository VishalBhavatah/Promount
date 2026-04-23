import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cable, Flame, Speaker, Gamepad, Maximize2, Building2, Sparkles, Monitor } from 'lucide-react';
import TabNavigation from '@/components/ui/TabNavigation';
import CTAButton from '@/components/ui/CTAButton';

const Services = ({ id }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hidden-wiring');
  
  const services = [
    {
      id: 'hidden-wiring',
      icon: Cable,
      title: 'Hidden Wiring, Done Right',
      description: 'Professional cable concealment that makes wires completely invisible. We run cables through walls using industry-standard techniques, ensuring a clean, seamless look that enhances your space. No unsightly cables, no exposed wires - just a perfectly clean installation that looks professionally designed.'
    },
    {
      id: 'fireplace',
      icon: Flame,
      title: 'Fireplace TV Installation',
      description: 'Specialized mounting above fireplaces with proper heat management and cable routing. We ensure safe clearances, proper ventilation, and use heat-resistant materials. Your TV will be perfectly positioned for comfortable viewing while maintaining all necessary safety standards.'
    },
    {
      id: 'soundbar',
      icon: Speaker,
      title: 'Soundbar Mounting',
      description: 'Perfect audio positioning for optimal sound quality. We mount your soundbar precisely aligned with your TV, run all cables invisibly, and ensure proper spacing for acoustic performance. Complete integration with your entertainment system.'
    },
    {
      id: 'gaming',
      icon: Gamepad,
      title: 'Gaming Console Setup',
      description: 'Complete gaming station installation with proper ventilation and cable management. We optimize your setup for minimal input lag, organize all controller charging stations, and ensure your console has proper airflow and accessibility.'
    },
    {
      id: 'flush-mount',
      icon: Maximize2,
      title: 'Flush-to-wall TV Installation',
      description: 'Ultra-slim, recessed mounting that makes your TV appear to float on the wall. We create a custom recess if needed, ensuring the absolute slimmest profile possible. Perfect for modern, minimalist aesthetics.'
    },
    {
      id: 'commercial',
      icon: Building2,
      title: 'Commercial TV Installation',
      description: 'Professional installations for businesses, restaurants, offices, and commercial spaces. We handle multi-display setups, digital signage, menu boards, and conference room displays with commercial-grade equipment and warranties.'
    },
    {
      id: 'cleanup',
      icon: Sparkles,
      title: 'Post-Install Clean-Up',
      description: 'Meticulous cleanup service included with every installation. We remove all packaging, vacuum any debris, touch up paint if needed, and leave your space spotless. Your home will look better than when we arrived.'
    },
    {
      id: 'bracket-supply',
      icon: Monitor,
      title: 'Wall Bracket Supply & Install',
      description: 'High-quality mounting brackets supplied and professionally installed. We source the perfect bracket for your TV size and wall type, ensuring maximum safety and the exact viewing angle you want.'
    }
  ];

  const tabs = services.map(s => ({
    id: s.id,
    label: s.title
  }));
  
  const activeService = services.find(s => s.id === activeTab);

  const handleCtaClick = () => {
    navigate('/booking');
  };

  return (
    <section id={id || "services"} className="py-16 bg-navy-900 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Comprehensive TV mounting and installation solutions for every need
          </p>
        </motion.div>

        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.3 }} 
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-navy-800/50 rounded-2xl p-8 md:p-12 border border-white/5 backdrop-blur-sm shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-orange-500/20 p-6 rounded-2xl mb-6 ring-1 ring-orange-500/30">
                    <activeService.icon className="w-16 h-16 text-orange-500" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {activeService.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-3xl">
                    {activeService.description}
                  </p>
                  
                  <CTAButton size="lg" onClick={handleCtaClick}>
                    Get Your Price in 30 seconds
                  </CTAButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;