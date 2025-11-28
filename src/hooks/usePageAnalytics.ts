import { useEffect, useRef, useCallback } from 'react';
import { useDocsAnalytics } from '../contexts/DocsAnalyticsContext';

interface UsePageAnalyticsOptions {
    pageId: string;
    pagePath: string;
    trackSections?: boolean;
}

export const usePageAnalytics = ({ pageId, pagePath, trackSections = true }: UsePageAnalyticsOptions) => {
    const { trackPageView, updateViewMetrics } = useDocsAnalytics();
    const startTime = useRef<number>(Date.now());
    const maxScrollDepth = useRef<number>(0);
    const sectionsViewed = useRef<Set<string>>(new Set());
    const lastUpdate = useRef<number>(0);

    // Track page view on mount
    useEffect(() => {
        startTime.current = Date.now();
        maxScrollDepth.current = 0;
        sectionsViewed.current = new Set();
        trackPageView(pageId, pagePath);
    }, [pageId, pagePath, trackPageView]);

    // Track scroll depth
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
            
            if (scrollPercent > maxScrollDepth.current) {
                maxScrollDepth.current = scrollPercent;
            }

            // Track sections in viewport if enabled
            if (trackSections) {
                const sections = document.querySelectorAll('h2[id], h3[id]');
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
                        sectionsViewed.current.add(section.id);
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trackSections]);

    // Periodic update of metrics (every 30 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            if (now - lastUpdate.current >= 30000) {
                const timeOnPage = Math.round((now - startTime.current) / 1000);
                updateViewMetrics(
                    pageId,
                    timeOnPage,
                    maxScrollDepth.current,
                    Array.from(sectionsViewed.current)
                );
                lastUpdate.current = now;
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [pageId, updateViewMetrics]);

    // Send final metrics on unmount
    useEffect(() => {
        return () => {
            const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
            updateViewMetrics(
                pageId,
                timeOnPage,
                maxScrollDepth.current,
                Array.from(sectionsViewed.current)
            );
        };
    }, [pageId, updateViewMetrics]);

    const getTimeOnPage = useCallback(() => {
        return Math.round((Date.now() - startTime.current) / 1000);
    }, []);

    const getScrollDepth = useCallback(() => {
        return maxScrollDepth.current;
    }, []);

    return {
        getTimeOnPage,
        getScrollDepth,
        sectionsViewed: sectionsViewed.current,
    };
};

