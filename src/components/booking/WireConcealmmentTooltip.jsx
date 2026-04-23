import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WireConcealmmentTooltip = ({ isVisible, title, description, position }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-100% + 10px)" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
          exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-100% + 5px)" }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] left-1/2 w-72 max-w-[calc(100vw-2rem)] p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl pointer-events-none border border-gray-700/50"
          style={{
            top: position.y,
            marginTop: '-12px',
          }}
        >
          <div className="font-bold text-orange-400 mb-2 text-base">{title}</div>
          <p className="leading-relaxed text-gray-200 text-xs sm:text-sm">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default WireConcealmmentTooltip;