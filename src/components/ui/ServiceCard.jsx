import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

const ServiceCard = ({ icon: Icon, title, description, price, ctaText = 'Get Your Price in 30 seconds', onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col"
    >
      <div className="bg-orange-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-4 flex-grow">{description}</p>
      
      {price && (
        <div className="mb-4">
          <span className="text-3xl font-bold text-orange-500">{price}</span>
        </div>
      )}
      
      <CTAButton className="w-full" onClick={onClick}>
        {ctaText}
      </CTAButton>
    </motion.div>
  );
};

export default ServiceCard;