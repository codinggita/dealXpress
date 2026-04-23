import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
  };

  if (to) {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link 
          to={to}
          className={`${baseStyles} ${variants[variant]} ${className}`} 
          {...props}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
