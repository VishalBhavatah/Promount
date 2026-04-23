import React from 'react';
import { motion } from 'framer-motion';

const TrustBadge = ({ icon: Icon, text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
    >
      <Icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
      <p className="text-white text-sm font-semibold">{text}</p>
    </motion.div>
  );
};

export default TrustBadge;