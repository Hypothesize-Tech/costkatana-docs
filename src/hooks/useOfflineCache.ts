import { useState, useEffect, useCallback } from 'react';
import { offlineCacheService } from '../services/offlineCache';

interface UseOfflineCacheReturn {
    isOnline: boolean;
    isServiceWorkerActive: boolean;
    cacheSize: number;
    clearCache: () => Promise<boolean>;
    precacheRoutes: (routes: string[]) => Promise<void>;
}

export const useOfflineCache = (): UseOfflineCacheReturn => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const [isServiceWorkerActive, setIsServiceWorkerActive] = useState<boolean>(false);
    const [cacheSize, setCacheSize] = useState<number>(0);

    // Update online status
    useEffect(() => {
        const handleOnlineStatusChange = (event: CustomEvent) => {
            setIsOnline(event.detail.online);
        };

        window.addEventListener('online-status-changed', handleOnlineStatusChange as EventListener);
        
        // Initial check
        setIsOnline(offlineCacheService.getOnlineStatus());
        setIsServiceWorkerActive(offlineCacheService.isServiceWorkerActive());

        return () => {
            window.removeEventListener('online-status-changed', handleOnlineStatusChange as EventListener);
        };
    }, []);

    // Update service worker status
    useEffect(() => {
        const checkServiceWorkerStatus = () => {
            setIsServiceWorkerActive(offlineCacheService.isServiceWorkerActive());
        };

        // Check initially
        checkServiceWorkerStatus();

        // Check periodically
        const interval = setInterval(checkServiceWorkerStatus, 5000);

        return () => clearInterval(interval);
    }, []);

    // Update cache size
    useEffect(() => {
        const updateCacheSize = async () => {
            const size = await offlineCacheService.getCacheSize();
            setCacheSize(size);
        };

        updateCacheSize();
        const interval = setInterval(updateCacheSize, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const clearCache = useCallback(async (): Promise<boolean> => {
        const success = await offlineCacheService.clearCache();
        if (success) {
            setCacheSize(0);
        }
        return success;
    }, []);

    const precacheRoutes = useCallback(async (routes: string[]): Promise<void> => {
        await offlineCacheService.precacheRoutes(routes);
    }, []);

    return {
        isOnline,
        isServiceWorkerActive,
        cacheSize,
        clearCache,
        precacheRoutes,
    };
};

