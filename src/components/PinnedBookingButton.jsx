import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';

const PinnedBookingButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={() => navigate('/booking')}
      className="fixed bottom-6 right-6 z-[60] bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group flex items-center gap-2 pr-6"
    >
      <div className="bg-white/20 p-2 rounded-full">
        <CalendarClock className="w-6 h-6" />
      </div>
      <span className="font-bold text-lg hidden sm:inline">Book Now</span>
    </motion.button>
  );
};

export default PinnedBookingButton;