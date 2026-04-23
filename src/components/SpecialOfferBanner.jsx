import React from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2 } from 'lucide-react';

const SpecialOfferBanner = ({ onOpenBooking }) => {
  const offers = [
    "Same-day TV Mounting at no extra cost",
    "TV Mounting starting at $29 using your mount, on drywall wall",
    "Satisfaction Guaranteed!",
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm">
              <Gift className="w-8 h-8 text-white mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                SPECIAL OFFERS
              </h2>
            </div>
          </div>
          
          <div className="grid gap-4 mb-10">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start md:items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="bg-white rounded-full p-1 mr-4 mt-0.5 md:mt-0 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-lg md:text-xl font-medium text-white text-left">
                  {offer}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenBooking}
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg md:text-xl px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform"
            >
              Get Your Price in 30 seconds
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;