import React from 'react';
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-400 to-orange-500 text-charcoal shadow-gold hover:shadow-[0_0_20px_-5px_rgba(245,194,107,0.6)] border border-transparent",
    secondary: "bg-surface border border-white/10 text-text-primary shadow-glass hover:bg-white/5",
    outline: "bg-transparent border-2 border-gold-400 text-gold-400 hover:bg-gold-400/10",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_20px_-5px_rgba(239,68,68,0.3)]",
    ghost: "bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center bg-inherit z-20"
        >
          <CgSpinner className="w-6 h-6" />
        </motion.div>
      )}

      <span className={`flex items-center gap-2 relative z-10 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>

      {variant === 'primary' && !disabled && !loading && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
      )}
    </motion.button>
  );
};

export default Button;