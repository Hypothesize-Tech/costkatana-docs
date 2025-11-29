import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    fullWidth?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = 'top',
    fullWidth = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && tooltipRef.current && wrapperRef.current) {
            const tooltip = tooltipRef.current;
            const wrapper = wrapperRef.current;
            const wrapperRect = wrapper.getBoundingClientRect();

            // Use fixed positioning to avoid overflow clipping
            tooltip.style.position = 'fixed';
            tooltip.style.zIndex = '10000';

            // Reset transform and margins
            tooltip.style.transform = '';
            tooltip.style.marginLeft = '';
            tooltip.style.marginRight = '';
            tooltip.style.marginTop = '';
            tooltip.style.marginBottom = '';

            // Calculate position based on wrapper's position on screen
            switch (position) {
                case 'top':
                    tooltip.style.left = `${wrapperRect.left + wrapperRect.width / 2}px`;
                    tooltip.style.bottom = `${window.innerHeight - wrapperRect.top + 8}px`;
                    tooltip.style.transform = 'translateX(-50%)';
                    break;
                case 'bottom':
                    tooltip.style.left = `${wrapperRect.left + wrapperRect.width / 2}px`;
                    tooltip.style.top = `${wrapperRect.bottom + 8}px`;
                    tooltip.style.transform = 'translateX(-50%)';
                    break;
                case 'left':
                    tooltip.style.right = `${window.innerWidth - wrapperRect.left + 8}px`;
                    tooltip.style.top = `${wrapperRect.top + wrapperRect.height / 2}px`;
                    tooltip.style.transform = 'translateY(-50%)';
                    break;
                case 'right':
                    tooltip.style.left = `${wrapperRect.right + 8}px`;
                    tooltip.style.top = `${wrapperRect.top + wrapperRect.height / 2}px`;
                    tooltip.style.transform = 'translateY(-50%)';
                    break;
            }

            // Check if tooltip goes off screen and adjust
            const tooltipRect = tooltip.getBoundingClientRect();
            if (tooltipRect.left < 0) {
                tooltip.style.left = '8px';
                tooltip.style.transform = position === 'top' || position === 'bottom' ? 'translateX(0)' : 'translateY(-50%)';
            }
            if (tooltipRect.right > window.innerWidth) {
                tooltip.style.right = '8px';
                tooltip.style.left = 'auto';
                tooltip.style.transform = position === 'top' || position === 'bottom' ? 'translateX(0)' : 'translateY(-50%)';
            }
            if (tooltipRect.top < 0) {
                tooltip.style.top = '8px';
                tooltip.style.transform = position === 'left' || position === 'right' ? 'translateY(0)' : 'translateX(-50%)';
            }
            if (tooltipRect.bottom > window.innerHeight) {
                tooltip.style.bottom = '8px';
                tooltip.style.top = 'auto';
                tooltip.style.transform = position === 'left' || position === 'right' ? 'translateY(0)' : 'translateX(-50%)';
            }
        }
    }, [isVisible, position]);

    return (
        <>
            <div
                ref={wrapperRef}
                className={`relative ${fullWidth ? 'w-full' : 'inline-flex items-center justify-center'}`}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && typeof document !== 'undefined' && createPortal(
                <div
                    ref={tooltipRef}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg whitespace-nowrap pointer-events-none animate-fade-in"
                    role="tooltip"
                >
                    {content}
                    <div
                        className={`absolute w-0 h-0 border-4 border-transparent ${position === 'top'
                            ? 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-800'
                            : position === 'bottom'
                                ? 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-800'
                                : position === 'left'
                                    ? 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-800'
                                    : 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-800'
                            }`}
                    />
                </div>,
                document.body
            )}
        </>
    );
};

