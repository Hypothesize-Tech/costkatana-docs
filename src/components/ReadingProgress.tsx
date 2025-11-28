import React, { useEffect, useState } from 'react';
import { useReading } from '../contexts/ReadingContext';

interface ReadingProgressProps {
    contentContainerId?: string;
    className?: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ contentContainerId = 'main-content', className = '' }) => {
    const { settings } = useReading();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!settings.showReadingProgress) return;

        const updateProgress = () => {
            // Always track the content container's scroll, not the window scrollbar
            const contentContainer = document.getElementById(contentContainerId);

            if (contentContainer) {
                const scrollTop = contentContainer.scrollTop;
                const scrollHeight = contentContainer.scrollHeight - contentContainer.clientHeight;
                const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                setProgress(Math.min(100, Math.max(0, scrollPercent)));
            } else {
                // Fallback to window scroll if content container not found
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                setProgress(Math.min(100, Math.max(0, scrollPercent)));
            }
        };

        // Always listen to content container scroll
        const contentContainer = document.getElementById(contentContainerId);

        if (contentContainer) {
            // Listen to content container scroll
            contentContainer.addEventListener('scroll', updateProgress, { passive: true });

            // Initial progress calculation
            updateProgress();

            // Also update on resize in case content height changes
            const handleResize = () => {
                updateProgress();
            };
            window.addEventListener('resize', handleResize, { passive: true });

            return () => {
                contentContainer.removeEventListener('scroll', updateProgress);
                window.removeEventListener('resize', handleResize);
            };
        } else {
            // Fallback: listen to window scroll if container not found
            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();

            return () => {
                window.removeEventListener('scroll', updateProgress);
            };
        }
    }, [settings.showReadingProgress, contentContainerId]);

    if (!settings.showReadingProgress) return null;

    return (
        <div className={`fixed top-16 left-0 right-0 z-40 reading-progress ${className}`}>
            <div className="h-1 bg-light-bg-200 dark:bg-dark-bg-300">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-success-500 transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ReadingProgress;
