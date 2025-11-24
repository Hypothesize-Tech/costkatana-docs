import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Download } from 'lucide-react';
import { useOfflineCache } from '../hooks/useOfflineCache';

const OfflineIndicator: React.FC = () => {
    const { isOnline, isServiceWorkerActive, cacheSize } = useOfflineCache();

    const formatCacheSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-16 left-0 right-0 z-50 px-4 py-2 bg-warning-500/90 dark:bg-warning-600/90 backdrop-blur-sm border-b border-warning-600 dark:border-warning-700 shadow-lg"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <WifiOff className="text-white" size={20} />
                            <span className="text-white text-sm font-medium">
                                You're offline. Viewing cached content.
                            </span>
                        </div>
                        {isServiceWorkerActive && cacheSize > 0 && (
                            <div className="flex items-center gap-2 text-white/80 text-xs">
                                <Download size={14} />
                                <span>{formatCacheSize(cacheSize)} cached</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfflineIndicator;

