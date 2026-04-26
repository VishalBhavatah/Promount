import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 bg-navy-900 relative overflow-hidden">
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
            
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block bg-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full mb-4"
              >
                🏀 NBA PLAYOFFS SPECIAL
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready for Playoff Season?
              </h2>
              <p className="text-xl text-white/90">
                Don't miss a moment — get your TV mounted professionally before tip-off!
              </p>
            </div>

            {/* Monday/Tuesday Discount Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-orange-500/20 border border-orange-500/50 rounded-xl p-5 text-center mb-8 max-w-lg mx-auto"
            >
              <p className="text-white font-bold text-lg mb-1">📅 Book Monday or Tuesday</p>
              <p className="text-orange-400 font-black text-2xl">Get an Extra 10% Off</p>
              <p className="text-white/70 text-sm mt-1">Discount applied automatically at checkout</p>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
              <a
                href="/booking"
                onClick={(e) => { e.preventDefault(); navigate('/booking'); }}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-wide shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 active:scale-95 transition-all text-center"
              >
                Book Now
              </a>
              <a
                href="tel:9724303694"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-wide border border-white/20 hover:border-white/40 active:scale-95 transition-all text-center"
              >
                Call Now — (972) 430-3694
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="8" fill="#ff6b35"/>
                <path d="M4.5 8l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-white font-semibold text-base">
                Same-day slots available at no extra cost
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;