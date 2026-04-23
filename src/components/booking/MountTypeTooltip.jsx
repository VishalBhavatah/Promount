import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MountTypeTooltip = ({ isVisible, title, description, position }) => {
  // Use createPortal to render the tooltip directly into document.body
  // This ensures fixed positioning is relative to the viewport, bypassing any parent transforms
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // We use x: "-50%" in both initial and animate to maintain horizontal centering
          // y animates from "calc(-100% + 10px)" to "-100%" to create a slight upward float effect
          initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-100% + 10px)" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
          exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-100% + 5px)" }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] left-1/2 w-72 max-w-[calc(100vw-2rem)] p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl pointer-events-none border border-gray-700/50"
          style={{
            top: position.y,
            marginTop: '-12px', // Creates a consistent gap above the target element
          }}
        >
          <div className="font-bold text-orange-400 mb-2 text-base">{title}</div>
          {/* Restored the description display as requested */}
          <p className="leading-relaxed text-gray-200 text-xs sm:text-sm">{description}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MountTypeTooltip;