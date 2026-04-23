import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Award, Zap } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';

const PromoBanner = () => {
  const navigate = useNavigate();
  const features = [
    { icon: Zap, text: "Same-Day Installation" },
    { icon: Shield, text: "Fully Insured" },
    { icon: CheckCircle, text: "Installation From $29" }
  ];

  const handleCall = () => {
    window.location.href = 'tel:8326647597';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-2 border-orange-500 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block bg-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full mb-4"
              >
                MARCH MADNESS SPECIAL
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready for Game Day?
              </h2>
              <p className="text-xl text-white/90">
                Get your TV mounted professionally before the big game!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-10 px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-orange-500/50 transition-all duration-300 min-w-[200px] flex-grow"
                >
                  <feature.icon className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                  <p className="text-white text-lg font-medium">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
              {/* Primary Action: Get Price */}
              <CTAButton 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xl px-8 py-6 shadow-2xl shadow-orange-500/50 w-full sm:w-auto transform transition-all hover:scale-105"
                onClick={() => navigate('/booking')}
              >
                Get Your Price in 30 seconds
              </CTAButton>

              {/* Secondary Action: Call Now */}
              <CTAButton 
                size="lg" 
                variant="outline"
                className="text-xl px-8 py-6 border-white/20 text-white hover:bg-white/10 shadow-2xl shadow-gray-900/20 w-full sm:w-auto"
                onClick={handleCall}
              >
                CALL NOW - (972) 430-3694
              </CTAButton>
            </div>
            <p className="text-white/70 text-sm mt-4 text-center">
              Book your same-day installation today • Limited availability
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;