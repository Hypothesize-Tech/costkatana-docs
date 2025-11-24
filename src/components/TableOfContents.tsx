import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
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

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const location = useLocation();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const idCountsRef = useRef<Record<string, number>>({});

    // Extract headings from markdown content
    useEffect(() => {
        if (!content) {
            setHeadings([]);
            return;
        }

        idCountsRef.current = {};
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
                baseId = `heading-${Object.keys(idCountsRef.current).length + 1}`;
            }

            // Ensure unique IDs
            if (idCountsRef.current[baseId]) {
                idCountsRef.current[baseId]++;
                baseId = `${baseId}-${idCountsRef.current[baseId]}`;
            } else {
                idCountsRef.current[baseId] = 1;
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
        if (headings.length === 0) return;

        // Clean up previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Wait for content to be fully rendered before setting up observers
        const setupObserver = () => {
            // Get the scrollable content container
            const contentContainer = document.getElementById('main-content');

            // Create new IntersectionObserver
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    // Find the entry with the highest intersection ratio that's in view
                    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                    if (visibleEntries.length > 0) {
                        // Sort by intersection ratio (highest first) and position (top first)
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
                    root: contentContainer, // Observe relative to the scrollable content container
                    rootMargin: '-32px 0px -33% 0px', // Adjusted margins for container scrolling
                    threshold: [0, 0.25, 0.5, 0.75, 1],
                }
            );

            // Observe all heading elements
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observerRef.current?.observe(element);
                }
            });
        };

        // Delay setup to ensure content is rendered
        const timer = setTimeout(setupObserver, 200);

        // Cleanup
        return () => {
            clearTimeout(timer);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    // Handle hash navigation on mount and hash changes
    useEffect(() => {
        const hash = location.hash.slice(1); // Remove the '#'
        if (hash && headings.length > 0) {
            // Wait for content to render
            const timer = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                    setActiveId(hash);
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [location.hash, headings]);

    // Handle click on TOC link
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Update URL hash first
        window.location.hash = id;

        // Set active ID immediately
        setActiveId(id);

        // Find and scroll to element immediately
        const scrollToElement = () => {
            let element = document.getElementById(id) as HTMLElement | null;

            // If exact ID not found, try to find elements with suffix (e.g., quick-setup-2)
            if (!element) {
                const headings = document.querySelectorAll('h1, h2, h3, h4');
                const suffixMatches = Array.from(headings).filter(h => h.id.startsWith(id + '-'));
                if (suffixMatches.length > 0) {
                    // Use the first suffix match (usually -2 for duplicates)
                    element = suffixMatches[0] as HTMLElement;
                }
            }

            if (element) {
                // Scroll the content container, not the entire document
                const contentContainer = document.getElementById('main-content') as HTMLElement | null;
                if (contentContainer) {
                    const elementTop = element.offsetTop;
                    contentContainer.scrollTo({
                        top: elementTop - 32, // Add some padding from top
                        behavior: 'smooth',
                    });
                } else {
                    // Fallback to element scrollIntoView if container not found
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }
        };

        // Small delay to ensure DOM is ready, but much faster than before
        setTimeout(scrollToElement, 50);
    };

    if (headings.length === 0) {
        return null;
    }

    // Render nested list structure
    const renderTOCItems = (items: TOCItem[], currentLevel: number = 1, startIndex: number = 0): { elements: JSX.Element[]; nextIndex: number } => {
        const result: JSX.Element[] = [];
        let i = startIndex;

        while (i < items.length) {
            const item = items[i];
            if (item.level === currentLevel) {
                const isActive = activeId === item.id;

                // Check if there are nested items
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
                            className={`block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${isActive
                                ? 'bg-primary-500/20 text-primary-600 dark:text-primary-400 font-semibold border-l-2 border-primary-500'
                                : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400'
                                }`}
                        >
                            {item.text}
                        </a>
                        {nestedElements.length > 0 && (
                            <ul className="ml-4 mt-1 space-y-0.5">
                                {nestedElements}
                            </ul>
                        )}
                    </li>
                );
                i = nextIndex;
            } else if (item.level < currentLevel) {
                // We've gone up a level, return to parent
                break;
            } else {
                // This shouldn't happen if recursion is correct, but handle it
                i++;
            }
        }

        return { elements: result, nextIndex: i };
    };

    return (
        <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="fixed top-24 right-8 w-64 max-h-[70vh] overflow-y-auto toc-scrollbar">
                <div className="card glass rounded-xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel p-4">
                    <h3 className="text-sm font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 gradient-text">
                        Table of Contents
                    </h3>
                    <nav>
                        <ul className="space-y-0.5">
                            {renderTOCItems(headings).elements}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TableOfContents;

