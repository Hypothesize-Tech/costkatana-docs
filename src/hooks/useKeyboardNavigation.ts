import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardNavigationCallbacks {
    onToggleSidebar?: () => void;
    onToggleTOC?: () => void;
    onToggleMobileTOC?: () => void;
    onOpenSearch?: () => void;
    onCloseModals?: () => void;
    onShowShortcuts?: () => void;
}

interface UseKeyboardNavigationOptions {
    enabled?: boolean;
    callbacks: KeyboardNavigationCallbacks;
}

export const useKeyboardNavigation = ({
    enabled = true,
    callbacks,
}: UseKeyboardNavigationOptions) => {
    const navigate = useNavigate();
    const gKeyPressedRef = useRef(false);
    const gKeyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const {
        onToggleSidebar,
        onToggleTOC,
        onToggleMobileTOC,
        onOpenSearch,
        onCloseModals,
        onShowShortcuts,
    } = callbacks;

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!enabled) return;

            // Don't trigger shortcuts when user is typing in input/textarea
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                // Allow Escape to close modals even when typing
                if (e.key === 'Escape' && onCloseModals) {
                    onCloseModals();
                }
                return;
            }

            // Handle Escape key
            if (e.key === 'Escape' && onCloseModals) {
                e.preventDefault();
                onCloseModals();
                return;
            }

            // Handle ? key for shortcuts
            if (e.key === '?' && !e.ctrlKey && !e.metaKey && onShowShortcuts) {
                e.preventDefault();
                onShowShortcuts();
                return;
            }

            // Handle G key sequences (G then H for home, G then S for search)
            if (e.key === 'g' || e.key === 'G') {
                if (!gKeyPressedRef.current) {
                    gKeyPressedRef.current = true;
                    e.preventDefault();

                    // Clear any existing timeout
                    if (gKeyTimeoutRef.current) {
                        clearTimeout(gKeyTimeoutRef.current);
                    }

                    // Set timeout to reset G key state
                    gKeyTimeoutRef.current = setTimeout(() => {
                        gKeyPressedRef.current = false;
                    }, 1000);

                    return;
                }
            }

            // Handle second key after G
            if (gKeyPressedRef.current) {
                if (e.key === 'h' || e.key === 'H') {
                    e.preventDefault();
                    navigate('/');
                    gKeyPressedRef.current = false;
                    if (gKeyTimeoutRef.current) {
                        clearTimeout(gKeyTimeoutRef.current);
                    }
                    return;
                }

                if (e.key === 's' || e.key === 'S') {
                    e.preventDefault();
                    if (onOpenSearch) {
                        onOpenSearch();
                    }
                    gKeyPressedRef.current = false;
                    if (gKeyTimeoutRef.current) {
                        clearTimeout(gKeyTimeoutRef.current);
                    }
                    return;
                }

                // Reset if any other key is pressed
                gKeyPressedRef.current = false;
                if (gKeyTimeoutRef.current) {
                    clearTimeout(gKeyTimeoutRef.current);
                }
            }

            // Handle single key shortcuts (only if not typing)
            if (e.key === 'b' || e.key === 'B') {
                if (onToggleSidebar && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onToggleSidebar();
                }
                return;
            }

            if (e.key === 't' || e.key === 'T') {
                if (onToggleTOC && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onToggleTOC();
                }
                return;
            }

            if (e.key === 'm' || e.key === 'M') {
                if (onToggleMobileTOC && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onToggleMobileTOC();
                }
                return;
            }
        },
        [
            enabled,
            navigate,
            onToggleSidebar,
            onToggleTOC,
            onToggleMobileTOC,
            onOpenSearch,
            onCloseModals,
            onShowShortcuts,
        ]
    );

    useEffect(() => {
        if (!enabled) return;

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (gKeyTimeoutRef.current) {
                clearTimeout(gKeyTimeoutRef.current);
            }
        };
    }, [enabled, handleKeyDown]);
};

