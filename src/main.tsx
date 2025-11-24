import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { offlineCacheService } from './services/offlineCache';
import { navigationOrder } from './utils/navigationOrder';

// Register service worker
if ('serviceWorker' in navigator) {
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
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);