import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '' }) => {
    const location = useLocation();

    // Navigation data - should match Layout.tsx navigation structure
    const navigation = [
        {
            title: 'Getting Started',
            id: 'getting-started',
            items: [
                { path: '/getting-started/introduction', label: 'Introduction' },
                { path: '/getting-started/quick-start', label: 'Quick Start' },
                { path: '/getting-started/installation', label: 'Installation' },
                { path: '/models', label: 'Supported Models' },
                { path: '/examples', label: 'Code Examples' },
            ],
        },
        {
            title: 'Integrations',
            id: 'integrations',
            items: [
                { path: '/integrations/nodejs', label: 'Node.js SDK' },
                { path: '/integrations/python', label: 'Python SDK' },
                { path: '/integrations/cli', label: 'CLI Tool' },
                { path: '/integrations/chatgpt', label: 'ChatGPT Integration' },
            ],
        },
        {
            title: 'Features',
            id: 'features',
            items: [
                { path: '/features', label: 'Overview' },
                { path: '/features/dashboard', label: 'Dashboard' },
                { path: '/features/usage-tracking', label: 'Usage Tracking' },
                { path: '/features/analytics', label: 'Cost Analytics' },
                { path: '/features/optimization', label: 'AI Optimization' },
                { path: '/features/sast', label: 'SAST Optimization' },
                { path: '/features/predictive-intelligence', label: 'Predictive Intelligence' },
                { path: '/features/projects', label: 'Projects' },
                { path: '/features/templates', label: 'Prompt Templates' },
                { path: '/features/workflows', label: 'Workflows' },
                { path: '/features/gateway', label: 'Gateway & Proxy' },
                { path: '/features/key-vault', label: 'Key Vault' },
                { path: '/features/alerts', label: 'Alerts' },
                { path: '/features/training', label: 'Training' },
            ],
        },
        {
            title: 'API Reference',
            id: 'api',
            items: [
                { path: '/api', label: 'API Overview' },
                { path: '/api/authentication', label: 'Authentication' },
                { path: '/api/usage', label: 'Usage API' },
                { path: '/api/analytics', label: 'Analytics API' },
                { path: '/api/projects', label: 'Projects API' },
                { path: '/api/optimization', label: 'Optimization API' },
                { path: '/api/webhooks', label: 'Webhooks' },
                { path: '/api/rate-limits', label: 'Rate Limits' },
            ],
        },
        {
            title: 'Observability',
            id: 'observability',
            items: [
                { path: '/observability', label: 'Overview' },
                { path: '/observability/monitoring', label: 'Monitoring' },
                { path: '/observability/logging', label: 'Logging' },
                { path: '/observability/tracing', label: 'Tracing' },
                { path: '/observability/alerts', label: 'Alerts' },
            ],
        },
        {
            title: 'Support',
            id: 'support',
            items: [
                { path: '/support', label: 'Getting Help' },
                { path: '/support/faq', label: 'FAQ' },
                { path: '/support/troubleshooting', label: 'Troubleshooting' },
                { path: '/support/contact', label: 'Contact Us' },
            ],
        },
    ];

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = [
            { label: 'Home', path: '/', icon: <Home size={16} /> }
        ];

        const currentPath = location.pathname;

        // Skip home page
        if (currentPath === '/') return breadcrumbs;

        // Find matching section and item
        for (const section of navigation) {
            const matchingItem = section.items.find(item => item.path === currentPath);
            if (matchingItem) {
                breadcrumbs.push({
                    label: section.title,
                    path: section.items[0].path, // Link to first item in section
                });
                breadcrumbs.push({
                    label: matchingItem.label,
                    path: currentPath,
                });
                break;
            }
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    // Don't show breadcrumbs if we're only showing Home
    if (breadcrumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
            {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                    {index > 0 && (
                        <ChevronRight
                            size={14}
                            className="text-light-text-muted dark:text-dark-text-muted mx-1"
                        />
                    )}
                    {index === breadcrumbs.length - 1 ? (
                        // Last item (current page) - not clickable
                        <span className="flex items-center gap-1 text-light-text-secondary dark:text-dark-text-secondary font-medium">
                            {crumb.icon}
                            {crumb.label}
                        </span>
                    ) : (
                        // Previous items - clickable
                        <Link
                            to={crumb.path}
                            className="flex items-center gap-1 text-light-text-muted dark:text-dark-text-muted hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                        >
                            {crumb.icon}
                            {crumb.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
