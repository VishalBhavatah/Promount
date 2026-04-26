import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Speaker, Gamepad, Maximize2, Building2, Sparkles, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';

const Services = ({ id }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const services = [
    {
      id: 'fireplace',
      icon: Flame,
      title: 'Fireplace TV Installation',
      description: 'Specialized mounting above fireplaces with proper heat management and cable routing. Safe clearances, proper ventilation, and heat-resistant materials.',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 'soundbar',
      icon: Speaker,
      title: 'Soundbar Mounting',
      description: 'Perfect audio positioning for optimal sound quality, precisely aligned with your TV with all cables hidden for a clean look.',
      gradient: 'from-purple-500/20 to-blue-500/20'
    },
    {
      id: 'gaming',
      icon: Gamepad,
      title: 'Gaming Console Setup',
      description: 'Complete gaming station installation with proper ventilation, cable management, and optimized setup for minimal input lag.',
      gradient: 'from-green-500/20 to-teal-500/20'
    },
    {
      id: 'flush-mount',
      icon: Maximize2,
      title: 'Flush-to-wall TV Installation',
      description: 'Ultra-slim, recessed mounting that makes your TV appear to float on the wall. Perfect for modern, minimalist aesthetics.',
      gradient: 'from-blue-500/20 to-indigo-500/20'
    },
    {
      id: 'commercial',
      icon: Building2,
      title: 'Commercial TV Installation',
      description: 'Professional installations for businesses, restaurants, and offices. Multi-display setups, digital signage, and conference room displays.',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'cleanup',
      icon: Sparkles,
      title: 'Post-Install Clean-Up',
      description: 'Meticulous cleanup included with every installation. We remove all packaging, vacuum debris, and leave your space spotless.',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 'bracket-supply',
      icon: Monitor,
      title: 'Wall Bracket Supply & Install',
      description: 'High-quality mounting brackets supplied and professionally installed for your TV size and wall type.',
      gradient: 'from-cyan-500/20 to-blue-500/20'
    }
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section id={id || "services"} className="py-8 bg-navy-900 scroll-mt-20">
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

        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 -translate-x-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex-shrink-0 w-72"
              >
                <div className={`bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col`}>
                  <div className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed flex-grow">{service.description}</p>
                  <button
                    onClick={() => navigate('/booking')}
                    className="mt-6 w-full bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/50 hover:border-orange-500 rounded-xl py-2.5 text-sm font-bold transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-200 translate-x-3"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>


      </div>
    </section>
  );
};

export default Services;