/**
 * Navigation order for all documentation pages
 * Used for prev/next navigation and swipe gestures
 */
export const navigationOrder: string[] = [
    // Home
    '/',
    
    // Getting Started
    '/getting-started/introduction',
    '/getting-started/quick-start',
    '/getting-started/installation',
    '/models',
    '/examples',
    
    // Integrations
    '/integrations/nodejs',
    '/integrations/python',
    '/integrations/cli',
    '/integrations/chatgpt',
    '/integrations/automation-tools',
    '/integrations/automation-tools/zapier',
    '/integrations/automation-tools/make',
    '/integrations/automation-tools/n8n',
    
    // Features
    '/features',
    '/features/dashboard',
    '/features/usage-tracking',
    '/features/analytics',
    '/features/optimization',
    '/features/sast',
    '/features/predictive-intelligence',
    '/features/projects',
    '/features/templates',
    '/features/workflows',
    '/features/gateway',
    '/features/key-vault',
    '/features/alerts',
    '/features/tracing',
    '/features/telemetry',
    '/features/sessions',
    '/features/logs',
    '/features/cache',
    '/features/advanced-monitoring',
    '/features/unexplained-costs',
    '/features/experimentation',
    '/features/moderation',
    '/features/security',
    '/features/memory',
    '/features/cost-lake',
    '/features/github-integrations',
    
    // Observability
    '/observability/opentelemetry',
    
    // API Reference
    '/api',
    '/api/authentication',
    '/api/usage',
    '/api/analytics',
    '/api/projects',
    '/api/optimization',
    '/api/webhooks',
    '/api/rate-limits',
    '/api/chat',
    '/api/agent',
    '/api/memory',
    '/api/cache',
    '/api/telemetry',
    '/api/logs',
    '/api/budget',
    '/api/session-replay',
    '/api/trace',
    
    // Support
    '/faq',
    '/support',
];

/**
 * Get the previous page path from the current path
 */
export const getPreviousPage = (currentPath: string): string | null => {
    const index = navigationOrder.indexOf(currentPath);
    if (index <= 0) return null;
    return navigationOrder[index - 1];
};

/**
 * Get the next page path from the current path
 */
export const getNextPage = (currentPath: string): string | null => {
    const index = navigationOrder.indexOf(currentPath);
    if (index < 0 || index >= navigationOrder.length - 1) return null;
    return navigationOrder[index + 1];
};

/**
 * Check if a path exists in the navigation order
 */
export const isValidNavigationPath = (path: string): boolean => {
    return navigationOrder.includes(path);
};

