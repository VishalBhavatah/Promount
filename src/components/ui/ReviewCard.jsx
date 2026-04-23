import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ name, rating, text, date, compact = false }) => {
  return (
    <motion.div
      whileHover={{ y: compact ? -5 : 0 }}
      className={`bg-gradient-to-br from-white/5 to-white/10 rounded-xl ${compact ? 'p-6' : 'p-8'} border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col`}
    >
      {!compact && (
        <Quote className="w-12 h-12 text-orange-500/30 mb-4" />
      )}
      
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-orange-500 fill-orange-500" />
        ))}
      </div>
      
      <p className={`text-white/90 ${compact ? 'text-sm' : 'text-lg'} mb-6 flex-grow leading-relaxed italic`}>
        "{text}"
      </p>
      
      <div className="flex items-center">
        <div>
          <p className="text-white font-semibold">{name}</p>
          <p className="text-white/60 text-sm">{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;