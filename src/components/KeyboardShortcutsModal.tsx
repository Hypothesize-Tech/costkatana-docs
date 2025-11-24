import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Shortcut {
    keys: string[];
    description: string;
    category: string;
}

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const shortcuts: Shortcut[] = [
        {
            category: 'Navigation',
            keys: ['G', 'H'],
            description: 'Go to home page',
        },
        {
            category: 'Navigation',
            keys: ['G', 'S'],
            description: 'Open search',
        },
        {
            category: 'Navigation',
            keys: ['B'],
            description: 'Toggle sidebar',
        },
        {
            category: 'Navigation',
            keys: ['T'],
            description: 'Toggle table of contents (desktop)',
        },
        {
            category: 'Navigation',
            keys: ['M'],
            description: 'Toggle mobile table of contents',
        },
        {
            category: 'General',
            keys: ['?'],
            description: 'Show keyboard shortcuts',
        },
        {
            category: 'General',
            keys: ['Esc'],
            description: 'Close modals and overlays',
        },
        {
            category: 'Search',
            keys: ['⌘', 'K'],
            description: 'Open search modal (Mac)',
        },
        {
            category: 'Search',
            keys: ['Ctrl', 'K'],
            description: 'Open search modal (Windows/Linux)',
        },
        {
            category: 'Search',
            keys: ['↑', '↓'],
            description: 'Navigate search results',
        },
        {
            category: 'Search',
            keys: ['Enter'],
            description: 'Select search result',
        },
    ];

    const categories = Array.from(
        new Set(shortcuts.map((s) => s.category))
    );

    // Handle Escape key
    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Focus trap
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
            focusableElements.length - 1
        ] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        firstElement?.focus();
        window.addEventListener('keydown', handleTabKey);

        return () => {
            window.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-2xl pointer-events-auto h-full sm:h-auto sm:max-h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="shortcuts-title"
                        >
                            <div className="glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-2xl overflow-hidden backdrop-blur-xl h-full sm:h-auto flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30 flex-shrink-0">
                                    <div className="flex items-center gap-3">
                                        <Keyboard className="text-primary-600 dark:text-primary-400" size={24} />
                                        <h2
                                            id="shortcuts-title"
                                            className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary"
                                        >
                                            Keyboard Shortcuts
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="btn p-2 hover:bg-primary-100/50 dark:hover:bg-primary-900/30 rounded-lg transition-colors text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                        aria-label="Close keyboard shortcuts"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto px-6 py-4">
                                    {categories.map((category) => (
                                        <div key={category} className="mb-6 last:mb-0">
                                            <h3 className="text-sm font-display font-semibold text-primary-600 dark:text-primary-400 mb-3 uppercase tracking-wide">
                                                {category}
                                            </h3>
                                            <div className="space-y-2">
                                                {shortcuts
                                                    .filter((s) => s.category === category)
                                                    .map((shortcut, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between py-2 border-b border-primary-200/20 dark:border-primary-700/20 last:border-b-0"
                                                        >
                                                            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                                {shortcut.description}
                                                            </span>
                                                            <div className="flex items-center gap-1">
                                                                {shortcut.keys.map((key, keyIndex) => (
                                                                    <React.Fragment key={keyIndex}>
                                                                        <kbd className="px-2 py-1 text-xs glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono bg-light-bg dark:bg-dark-bg-300">
                                                                            {key}
                                                                        </kbd>
                                                                        {keyIndex < shortcut.keys.length - 1 && (
                                                                            <span className="text-light-text-muted dark:text-dark-text-muted mx-1">
                                                                                +
                                                                            </span>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-3 border-t border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel/50 dark:bg-gradient-dark-panel/50 flex-shrink-0">
                                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
                                        Press <kbd className="px-1.5 py-0.5 glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono">Esc</kbd> to close
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default KeyboardShortcutsModal;

