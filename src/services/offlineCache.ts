/**
 * Offline Cache Service
 * Manages service worker registration and cache operations
 */

const CACHE_NAME = 'costkatana-docs-v1';

export class OfflineCacheService {
    private static instance: OfflineCacheService;
    private registration: ServiceWorkerRegistration | null = null;
    private isOnline: boolean = navigator.onLine;

    private constructor() {
        this.setupOnlineOfflineListeners();
    }

    public static getInstance(): OfflineCacheService {
        if (!OfflineCacheService.instance) {
            OfflineCacheService.instance = new OfflineCacheService();
        }
        return OfflineCacheService.instance;
    }

    /**
     * Register the service worker
     */
    public async register(): Promise<ServiceWorkerRegistration | null> {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service Workers are not supported in this browser');
            return null;
        }

        try {
            this.registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
            });

            // Handle updates
            this.registration.addEventListener('updatefound', () => {
                const newWorker = this.registration?.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available, prompt user to refresh
                            console.log('New service worker available');
                        }
                    });
                }
            });

            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            return null;
        }
    }

    /**
     * Unregister the service worker
     */
    public async unregister(): Promise<boolean> {
        if (this.registration) {
            try {
                const success = await this.registration.unregister();
                this.registration = null;
                return success;
            } catch (error) {
                console.error('Service Worker unregistration failed:', error);
                return false;
            }
        }
        return false;
    }

    /**
     * Cache specific URLs
     */
    public async cacheUrls(urls: string[]): Promise<boolean> {
        if (!this.registration || !this.registration.active) {
            return false;
        }

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.success === true);
            };

            this.registration?.active?.postMessage(
                { type: 'CACHE_URLS', urls },
                [messageChannel.port2]
            );

            // Timeout after 30 seconds
            setTimeout(() => resolve(false), 30000);
        });
    }

    /**
     * Clear the cache
     */
    public async clearCache(): Promise<boolean> {
        if (!this.registration || !this.registration.active) {
            return false;
        }

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
                resolve(event.data.success === true);
            };

            this.registration?.active?.postMessage(
                { type: 'CLEAR_CACHE' },
                [messageChannel.port2]
            );

            // Timeout after 10 seconds
            setTimeout(() => resolve(false), 10000);
        });
    }

    /**
     * Get cache size estimate
     */
    public async getCacheSize(): Promise<number> {
        if (!('storage' in navigator && 'estimate' in navigator.storage)) {
            return 0;
        }

        try {
            const estimate = await navigator.storage.estimate();
            return estimate.usage || 0;
        } catch (error) {
            console.error('Failed to get cache size:', error);
            return 0;
        }
    }

    /**
     * Check if service worker is active
     */
    public isServiceWorkerActive(): boolean {
        return this.registration?.active !== null && this.registration?.active !== undefined;
    }

    /**
     * Get online status
     */
    public getOnlineStatus(): boolean {
        return this.isOnline;
    }

    /**
     * Setup online/offline event listeners
     */
    private setupOnlineOfflineListeners(): void {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.dispatchEvent(new CustomEvent('online-status-changed', { detail: { online: true } }));
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.dispatchEvent(new CustomEvent('online-status-changed', { detail: { online: false } }));
        });
    }

    /**
     * Dispatch custom events
     */
    private dispatchEvent(event: CustomEvent): void {
        window.dispatchEvent(event);
    }

    /**
     * Pre-cache all documentation routes
     */
    public async precacheRoutes(routes: string[]): Promise<void> {
        if (!this.isOnline) {
            return;
        }

        const urls = routes.map(route => {
            // Convert route to full URL
            if (route.startsWith('/')) {
                return `${window.location.origin}${route}`;
            }
            return route;
        });

        // Cache in batches to avoid overwhelming the browser
        const batchSize = 5;
        for (let i = 0; i < urls.length; i += batchSize) {
            const batch = urls.slice(i, i + batchSize);
            await this.cacheUrls(batch);
            // Small delay between batches
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

export const offlineCacheService = OfflineCacheService.getInstance();

