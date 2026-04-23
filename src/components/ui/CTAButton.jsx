import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const CTAButton = ({ children, className = '', size = 'md', variant = 'default', ...props }) => {
  const { toast } = useToast();

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
      return;
    }
    toast({
      title: "Feature Coming Soon!",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    default: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60',
    outline: 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizeClasses[size]} ${variantClasses[variant]} font-bold rounded-lg transition-all duration-300 ${className}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
};

export default CTAButton;