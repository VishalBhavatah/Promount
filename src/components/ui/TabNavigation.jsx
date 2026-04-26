import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
              : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TabNavigation;