import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="mb-4"
            >
                <div className="w-16 h-16 bg-gradient-primary glow-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="text-white" size={32} />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
            >
                <h3 className="text-lg font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Loading Documentation
                </h3>
                <div className="loading-dots text-primary-600 dark:text-primary-400">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
