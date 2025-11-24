import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, List } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface MobileTOCProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

// Function to slugify text for IDs (must match MarkdownContent exactly)
const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Function to remove emojis (must match MarkdownContent exactly)
const removeEmojis = (text: string): string => {
    return text
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emoticons & Symbols
        .replace(/[\u{2600}-\u{26FF}]/gu, '') // Misc symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport & Map
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental Symbols
        .replace(/[\u{FE00}-\u{FE0F}]/gu, '') // Variation Selectors
        .trim();
};

const MobileTOC: React.FC<MobileTOCProps> = ({ isOpen, onClose, content }) => {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [dragStart, setDragStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const y = useMotionValue(0);
    const opacity = useTransform(y, [0, 300], [1, 0]);

    // Extract headings from markdown content
    useEffect(() => {
        if (!content) {
            setHeadings([]);
            return;
        }

        const idCountsRef: Record<string, number> = {};
        const headingRegex = /^(#{1,4})\s+(.+)$/gm;
        const extractedHeadings: TOCItem[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            let text = match[2].trim();

            // Remove markdown formatting (must match MarkdownContent order exactly)
            text = text
                .replace(/\*\*(.+?)\*\*/g, '$1')
                .replace(/\*(.+?)\*/g, '$1')
                .replace(/\[(.+?)\]\(.+?\)/g, '$1')
                .replace(/`(.+?)`/g, '$1')
                .trim();

            // Remove emojis
            const cleanText = removeEmojis(text);

            // Generate ID using same logic as MarkdownContent
            let baseId = slugify(cleanText);
            if (!baseId) {
                baseId = `heading-${Object.keys(idCountsRef).length + 1}`;
            }

            // Ensure unique IDs
            if (idCountsRef[baseId]) {
                idCountsRef[baseId]++;
                baseId = `${baseId}-${idCountsRef[baseId]}`;
            } else {
                idCountsRef[baseId] = 1;
            }

            extractedHeadings.push({
                id: baseId,
                text: cleanText,
                level,
            });
        }

        setHeadings(extractedHeadings);
    }, [content]);

    // Set up IntersectionObserver to track active section
    useEffect(() => {
        if (headings.length === 0 || !isOpen) return;

        const contentContainer = document.getElementById('main-content');
        if (!contentContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    visibleEntries.sort((a, b) => {
                        if (b.intersectionRatio !== a.intersectionRatio) {
                            return b.intersectionRatio - a.intersectionRatio;
                        }
                        return a.boundingClientRect.top - b.boundingClientRect.top;
                    });
                    const topEntry = visibleEntries[0];
                    if (topEntry) {
                        setActiveId(topEntry.target.id);
                    }
                }
            },
            {
                root: contentContainer,
                rootMargin: '-32px 0px -33% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings, isOpen]);

    // Handle click on TOC link
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Update URL hash
        window.location.hash = id;
        setActiveId(id);

        // Scroll to element
        const scrollToElement = () => {
            let element = document.getElementById(id) as HTMLElement | null;

            if (!element) {
                const headings = document.querySelectorAll('h1, h2, h3, h4');
                const suffixMatches = Array.from(headings).filter(h => h.id.startsWith(id + '-'));
                if (suffixMatches.length > 0) {
                    element = suffixMatches[0] as HTMLElement;
                }
            }

            if (element) {
                const contentContainer = document.getElementById('main-content') as HTMLElement | null;
                if (contentContainer) {
                    const elementTop = element.offsetTop;
                    contentContainer.scrollTo({
                        top: elementTop - 32,
                        behavior: 'smooth',
                    });
                } else {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }
        };

        setTimeout(scrollToElement, 50);
        onClose(); // Close bottom sheet after navigation
    };

    // Handle drag for swipe-to-dismiss
    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDrag = (_: any, info: { offset: { y: number } }) => {
        y.set(info.offset.y);
    };

    const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
        setIsDragging(false);
        const shouldClose = info.offset.y > 150 || info.velocity.y > 500;

        if (shouldClose) {
            onClose();
        } else {
            y.set(0);
        }
    };

    // Render nested list structure
    const renderTOCItems = (items: TOCItem[], currentLevel: number = 1, startIndex: number = 0): { elements: JSX.Element[]; nextIndex: number } => {
        const result: JSX.Element[] = [];
        let i = startIndex;

        while (i < items.length) {
            const item = items[i];
            if (item.level === currentLevel) {
                const isActive = activeId === item.id;

                let nestedElements: JSX.Element[] = [];
                let nextIndex = i + 1;

                if (i + 1 < items.length && items[i + 1].level > currentLevel) {
                    const nested = renderTOCItems(items, currentLevel + 1, i + 1);
                    nestedElements = nested.elements;
                    nextIndex = nested.nextIndex;
                }

                result.push(
                    <li key={item.id} className="mb-1">
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className={`flex items-center px-4 py-3 rounded-lg text-sm transition-all duration-200 min-h-[44px] ${isActive
                                ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400 font-semibold border-l-4 border-primary-500'
                                : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400'
                                }`}
                            style={{ paddingLeft: `${(item.level - 1) * 16 + 16}px` }}
                            aria-current={isActive ? 'location' : undefined}
                            aria-label={`Jump to ${item.text}`}
                        >
                            {item.text}
                        </a>
                        {nestedElements.length > 0 && (
                            <ul className="mt-1 space-y-0.5">
                                {nestedElements}
                            </ul>
                        )}
                    </li>
                );
                i = nextIndex;
            } else if (item.level < currentLevel) {
                break;
            } else {
                i++;
            }
        }

        return { elements: result, nextIndex: i };
    };

    if (headings.length === 0) {
        return null;
    }

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
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.2 }}
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        style={{ y, opacity }}
                        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gradient-light-panel dark:bg-gradient-dark-panel rounded-t-3xl shadow-2xl border-t border-primary-200/30 dark:border-primary-700/30 max-h-[85vh] flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-toc-title"
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-12 h-1.5 bg-light-text-muted dark:text-dark-text-muted rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30">
                            <div className="flex items-center gap-3">
                                <List className="text-primary-600 dark:text-primary-400" size={20} aria-hidden="true" />
                                <h3 className="text-lg font-display font-semibold text-light-text-primary dark:text-dark-text-primary">
                                    Table of Contents
                                </h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="btn p-2 rounded-lg hover:bg-primary-500/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Close table of contents"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        {/* TOC Content */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 toc-scrollbar">
                            <nav aria-label="Table of contents navigation">
                                <ul className="space-y-0.5" role="list">
                                    {renderTOCItems(headings).elements}
                                </ul>
                            </nav>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileTOC;

