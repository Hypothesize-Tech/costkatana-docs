import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, AlertCircle, Clock } from 'lucide-react';
import MarkdownContent from './MarkdownContent';
import TableOfContents from './TableOfContents';
import Breadcrumb from './Breadcrumb';
import ReadingProgress from './ReadingProgress';
import MiniTOC from './MiniTOC';
import LoadingSpinner from './LoadingSpinner';
import { useMarkdownContent } from '../hooks/useMarkdownContent';
import { useReading } from '../contexts/ReadingContext';
import { useTOC } from '../contexts/TOCContext';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

interface NavigationLink {
    path: string;
    label: string;
}

interface DocumentationPageProps {
    title: string;
    description?: string;
    fallbackContent?: string;
    prevPage?: NavigationLink;
    nextPage?: NavigationLink;
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({
    title,
    description,
    fallbackContent,
    prevPage,
    nextPage,
}) => {
    const location = useLocation();
    const { content, loading, error } = useMarkdownContent(location.pathname, fallbackContent);
    const { settings, estimateReadingTime, getReadingPosition, saveReadingPosition } = useReading();
    const { setContent } = useTOC();
    const { swipeState } = useSwipeNavigation({ enabled: true });

    // Update TOC content when content changes
    useEffect(() => {
        if (content) {
            setContent(content);
        }
    }, [content, setContent]);

    // Handle hash navigation on mount and when hash changes
    useEffect(() => {
        if (loading || !content) return;

        const hash = location.hash.slice(1); // Remove the '#'
        if (hash) {
            // Wait for content to render, then scroll to hash in content container
            const timer = setTimeout(() => {
                let element = document.getElementById(hash) as HTMLElement | null;

                // If exact ID not found, try to find elements with suffix (e.g., quick-setup-2)
                if (!element) {
                    const headings = document.querySelectorAll('h1, h2, h3, h4');
                    const suffixMatches = Array.from(headings).filter(h => h.id.startsWith(hash + '-'));
                    if (suffixMatches.length > 0) {
                        element = suffixMatches[0] as HTMLElement;
                    }
                }

                if (element) {
                    const contentContainer = document.getElementById('main-content') as HTMLElement | null;
                    if (contentContainer) {
                        const elementTop = element.offsetTop;
                        contentContainer.scrollTo({
                            top: elementTop - 32, // Add some padding from top
                            behavior: 'smooth',
                        });
                    } else {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                }
            }, 100); // Reduced delay for faster response

            return () => clearTimeout(timer);
        }
    }, [location.hash, content, loading]);

    // Listen for hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                let element = document.getElementById(hash) as HTMLElement | null;

                // If exact ID not found, try to find elements with suffix (e.g., quick-setup-2)
                if (!element) {
                    const headings = document.querySelectorAll('h1, h2, h3, h4');
                    const suffixMatches = Array.from(headings).filter(h => h.id.startsWith(hash + '-'));
                    if (suffixMatches.length > 0) {
                        element = suffixMatches[0] as HTMLElement;
                    }
                }

                if (element) {
                    const contentContainer = document.getElementById('main-content') as HTMLElement | null;
                    if (contentContainer) {
                        const elementTop = element.offsetTop;
                        contentContainer.scrollTo({
                            top: elementTop - 32, // Add some padding from top
                            behavior: 'smooth',
                        });
                    } else {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Bookmarking: Save and restore scroll position
    useEffect(() => {
        if (!loading && content) {
            // Restore reading position
            const savedPosition = getReadingPosition(location.pathname);
            if (savedPosition > 0) {
                const contentContainer = document.getElementById('main-content') as HTMLElement | null;
                if (contentContainer) {
                    setTimeout(() => {
                        contentContainer.scrollTop = savedPosition;
                    }, 100);
                }
            }

            // Save reading position on scroll
            const contentContainer = document.getElementById('main-content') as HTMLElement | null;
            if (contentContainer) {
                const handleScroll = () => {
                    saveReadingPosition(location.pathname, contentContainer.scrollTop);
                };

                contentContainer.addEventListener('scroll', handleScroll);
                return () => contentContainer.removeEventListener('scroll', handleScroll);
            }
        }
    }, [loading, content, location.pathname, getReadingPosition, saveReadingPosition]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Helmet>
                <title>{title} - Cost Katana Documentation</title>
                {description && <meta name="description" content={description} />}
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex gap-8 items-start relative">
                    {/* Main Content - Scrollable */}
                    <div
                        className="flex-1 min-w-0 max-w-4xl max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide relative"
                        id="main-content"
                        style={{
                            transform: swipeState.isSwiping
                                ? `translateX(${swipeState.direction === 'left' ? swipeState.progress * 20 : swipeState.progress * -20}px)`
                                : 'translateX(0)',
                            transition: swipeState.isSwiping ? 'none' : 'transform 0.3s ease-out',
                        }}
                    >
                        {/* Swipe Indicators */}
                        {swipeState.isSwiping && (
                            <>
                                {swipeState.direction === 'right' && (
                                    <div
                                        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 lg:hidden pointer-events-none"
                                        style={{
                                            opacity: swipeState.progress,
                                        }}
                                    >
                                        <div className="bg-primary-500/20 backdrop-blur-sm rounded-r-full px-4 py-8 border-r-2 border-primary-500">
                                            <ChevronLeft className="text-primary-600 dark:text-primary-400" size={24} />
                                        </div>
                                    </div>
                                )}
                                {swipeState.direction === 'left' && (
                                    <div
                                        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 lg:hidden pointer-events-none"
                                        style={{
                                            opacity: swipeState.progress,
                                        }}
                                    >
                                        <div className="bg-primary-500/20 backdrop-blur-sm rounded-l-full px-4 py-8 border-l-2 border-primary-500">
                                            <ChevronRight className="text-primary-600 dark:text-primary-400" size={24} />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {/* Breadcrumb Navigation and Reading Info */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <Breadcrumb />
                                {settings.showReadingTime && content && (
                                    <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        <Clock className="w-4 h-4" />
                                        <span>{estimateReadingTime(content)} min read</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reading Progress */}
                        <ReadingProgress contentContainerId="main-content" />

                        {/* Mini Table of Contents */}
                        <MiniTOC content={content} className="mb-6" />

                        {error && !content ? (
                            <div className="card glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl p-12 text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center glass border border-warning-200/30 dark:border-warning-700/30 bg-gradient-warning/10">
                                        <AlertCircle className="text-warning-600 dark:text-warning-400" size={40} />
                                    </div>
                                </div>

                                <h1 className="text-3xl font-display font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">{title}</h1>
                                {description && (
                                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">{description}</p>
                                )}

                                <div className="rounded-xl p-6 max-w-md mx-auto glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel">
                                    <FileText className="text-light-text-muted dark:text-dark-text-muted mb-3 mx-auto" size={24} />
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="card glass rounded-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl p-8 mb-8">
                                    <MarkdownContent content={content} />
                                </div>

                                {(prevPage || nextPage) && (
                                    <div className="flex justify-between mb-8">
                                        {prevPage ? (
                                            <Link
                                                to={prevPage.path}
                                                className="card-hover flex items-center space-x-2 px-4 py-2 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                                            >
                                                <ChevronLeft size={20} />
                                                <span className="font-semibold">{prevPage.label}</span>
                                            </Link>
                                        ) : (
                                            <div />
                                        )}

                                        {nextPage && (
                                            <Link
                                                to={nextPage.path}
                                                className="card-hover flex items-center space-x-2 px-4 py-2 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300"
                                            >
                                                <span className="font-semibold">{nextPage.label}</span>
                                                <ChevronRight size={20} />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Table of Contents */}
                    {content && !error && <TableOfContents content={content} />}
                </div>
            </motion.div>
        </>
    );
};

export default DocumentationPage;
