import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { offlineCacheService } from './services/offlineCache';
import { navigationOrder } from './utils/navigationOrder';

// Register service worker only in production to avoid HMR conflicts
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    offlineCacheService.register().then((registration) => {
      if (registration) {
        console.log('Service Worker registered successfully');

        // Pre-cache all documentation routes in the background
        if (navigator.onLine) {
          setTimeout(() => {
            offlineCacheService.precacheRoutes(navigationOrder);
          }, 5000); // Wait 5 seconds after page load
        }
      }
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  } else {
    // Ensure dev builds don't keep stale workers around
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);