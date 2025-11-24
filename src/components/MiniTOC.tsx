import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MiniTOCItem {
    id: string;
    text: string;
    level: number;
}

interface MiniTOCProps {
    content: string;
    className?: string;
}

const MiniTOC: React.FC<MiniTOCProps> = ({ content, className = '' }) => {
    const [headings, setHeadings] = useState<MiniTOCItem[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const idCountsRef = useRef<Record<string, number>>({});

    // Function to slugify text for IDs (copied from MarkdownContent.tsx)
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

    // Function to remove emojis (copied from MarkdownContent.tsx)
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

    // Extract headings from markdown content using same logic as TableOfContents
    useEffect(() => {
        const extracted: MiniTOCItem[] = [];
        const headingRegex = /^(#{1,4})\s+(.+)$/gm;
        let match;

        // Reset ID counts for new content
        idCountsRef.current = {};

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const rawText = match[2];

            // Remove markdown formatting (must match MarkdownContent order)
            let cleanText = rawText
                .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
                .replace(/\*(.+?)\*/g, '$1')     // Italic
                .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
                .replace(/`(.+?)`/g, '$1')       // Inline code
                .trim();

            // Remove emojis using the same function as MarkdownContent
            cleanText = removeEmojis(cleanText);

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

            extracted.push({
                id: baseId,
                text: cleanText,
                level,
            });
        }

        setHeadings(extracted);
    }, [content]);

    const handleHeadingClick = (headingId: string) => {
        const element = document.getElementById(headingId);
        if (element) {
            const contentContainer = document.getElementById('main-content');
            if (contentContainer) {
                const elementTop = element.offsetTop;
                contentContainer.scrollTo({
                    top: elementTop - 32,
                    behavior: 'smooth',
                });
            }
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className={`border-t border-b border-primary-200/20 dark:border-primary-700/20 py-7 ${className}`} aria-label="On this page">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left group"
                aria-expanded={isExpanded}
                aria-controls="mini-toc-list"
            >
                <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    On this page
                </span>
                {isExpanded ? (
                    <ChevronUp size={16} className="text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                ) : (
                    <ChevronDown size={16} className="text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                )}
            </button>

            {isExpanded && (
                <div id="mini-toc-list" className="mt-3 space-y-1" role="list">
                    {headings.slice(0, 8).map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => handleHeadingClick(heading.id)}
                            className={`block text-left w-full px-2 py-1 rounded text-sm transition-all duration-200 hover:bg-primary-500/10 ${heading.level === 1
                                ? 'font-semibold text-light-text-primary dark:text-dark-text-primary ml-0'
                                : heading.level === 2
                                    ? 'text-light-text-secondary dark:text-dark-text-secondary ml-2'
                                    : 'text-light-text-muted dark:text-dark-text-muted ml-4'
                                }`}
                            aria-label={`Jump to ${heading.text}`}
                        >
                            {heading.text}
                        </button>
                    ))}
                    {headings.length > 8 && (
                        <div className="px-2 py-1 text-xs text-light-text-muted dark:text-dark-text-muted" aria-label={`${headings.length - 8} more sections available`}>
                            +{headings.length - 8} more sections
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default MiniTOC;
