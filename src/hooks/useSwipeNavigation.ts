import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPreviousPage, getNextPage, isValidNavigationPath } from '../utils/navigationOrder';

interface SwipeState {
    isSwiping: boolean;
    direction: 'left' | 'right' | null;
    progress: number; // 0-1
}

interface UseSwipeNavigationOptions {
    threshold?: number; // Minimum swipe distance in pixels (default: 50)
    maxSwipeDistance?: number; // Maximum swipe distance for progress calculation (default: 200)
    enabled?: boolean; // Enable/disable swipe navigation (default: true)
}

export const useSwipeNavigation = (options: UseSwipeNavigationOptions = {}) => {
    const {
        threshold = 50,
        maxSwipeDistance = 200,
        enabled = true,
    } = options;

    const navigate = useNavigate();
    const location = useLocation();
    const [swipeState, setSwipeState] = useState<SwipeState>({
        isSwiping: false,
        direction: null,
        progress: 0,
    });

    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const elementRef = useRef<HTMLElement | null>(null);

    // Detect if user is scrolling
    const handleScroll = useCallback(() => {
        isScrollingRef.current = true;
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
        }, 150);
    }, []);

    // Handle touch start
    const handleTouchStart = useCallback((e: TouchEvent) => {
        if (!enabled || isScrollingRef.current) return;
        
        // Don't allow swipe if user is selecting text
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;

        const touch = e.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now(),
        };
    }, [enabled]);

    // Handle touch move
    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!enabled || !touchStartRef.current || isScrollingRef.current) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Only proceed if horizontal swipe is dominant
        if (absDeltaX < absDeltaY) {
            // Vertical scroll detected, cancel swipe
            touchStartRef.current = null;
            setSwipeState({
                isSwiping: false,
                direction: null,
                progress: 0,
            });
            return;
        }

        // Check if we have a valid navigation path
        if (!isValidNavigationPath(location.pathname)) {
            return;
        }

        // Determine direction
        const direction = deltaX > 0 ? 'right' : 'left';
        
        // Check if we can navigate in this direction
        const canNavigatePrev = direction === 'right' && getPreviousPage(location.pathname) !== null;
        const canNavigateNext = direction === 'left' && getNextPage(location.pathname) !== null;

        if (!canNavigatePrev && !canNavigateNext) {
            return;
        }

        // Calculate progress (0-1)
        const progress = Math.min(absDeltaX / maxSwipeDistance, 1);

        setSwipeState({
            isSwiping: true,
            direction,
            progress,
        });

        // Prevent default scrolling during horizontal swipe
        if (absDeltaX > 10) {
            e.preventDefault();
        }
    }, [enabled, location.pathname, maxSwipeDistance]);

    // Handle touch end
    const handleTouchEnd = useCallback((e: TouchEvent) => {
        if (!enabled || !touchStartRef.current || isScrollingRef.current) {
            touchStartRef.current = null;
            setSwipeState({
                isSwiping: false,
                direction: null,
                progress: 0,
            });
            return;
        }

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const absDeltaX = Math.abs(deltaX);

        if (absDeltaX >= threshold && swipeState.direction) {
            // Navigate based on direction
            if (swipeState.direction === 'right') {
                const prevPage = getPreviousPage(location.pathname);
                if (prevPage) {
                    navigate(prevPage);
                }
            } else if (swipeState.direction === 'left') {
                const nextPage = getNextPage(location.pathname);
                if (nextPage) {
                    navigate(nextPage);
                }
            }
        }

        // Reset state
        touchStartRef.current = null;
        setSwipeState({
            isSwiping: false,
            direction: null,
            progress: 0,
        });
    }, [enabled, threshold, swipeState.direction, location.pathname, navigate]);

    // Set up event listeners
    useEffect(() => {
        if (!enabled) return;

        const element = elementRef.current || document.body;
        const contentContainer = document.getElementById('main-content');

        // Use content container if available, otherwise use element
        const scrollElement = contentContainer || element;

        scrollElement.addEventListener('scroll', handleScroll, { passive: true });
        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            scrollElement.removeEventListener('scroll', handleScroll);
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [enabled, handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

    return {
        swipeState,
        elementRef,
    };
};

