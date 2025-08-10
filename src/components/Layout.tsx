import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Search,
    Moon,
    Sun,
    ChevronDown,
    ChevronRight,
    Home,
    BookOpen,
    Plug,
    Layers,
    Code,
    HelpCircle,
    MessageCircle,
    Github,
    ExternalLink,
    Zap,
    Database,
    Shield,
    TrendingUp,
    Terminal,
    Cloud,
    Key,
    Bell,
    Brain,
    Settings,
    FileText,
    Package,
    Cpu
} from 'lucide-react';
import SearchModal from './SearchModal';

interface LayoutProps {
    children: React.ReactNode;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
    const location = useLocation();

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const navigation = [
        {
            title: 'Getting Started',
            id: 'getting-started',
            icon: <BookOpen size={18} />,
            items: [
                { path: '/getting-started/introduction', label: 'Introduction', icon: <FileText size={16} /> },
                { path: '/getting-started/quick-start', label: 'Quick Start', icon: <Zap size={16} /> },
                { path: '/getting-started/installation', label: 'Installation', icon: <Package size={16} /> },
            ],
        },
        {
            title: 'Integrations',
            id: 'integrations',
            icon: <Plug size={18} />,
            items: [
                { path: '/integrations/cli', label: 'CLI Tool', icon: <Terminal size={16} /> },
                { path: '/integrations/nodejs', label: 'Node.js SDK', icon: <Code size={16} /> },
                { path: '/integrations/python', label: 'Python SDK', icon: <Cpu size={16} /> },
                { path: '/integrations/chatgpt', label: 'ChatGPT Integration', icon: <MessageCircle size={16} /> },
            ],
        },
        {
            title: 'Features',
            id: 'features',
            icon: <Layers size={18} />,
            items: [
                { path: '/features', label: 'Overview', icon: <Layers size={16} /> },
                { path: '/features/dashboard', label: 'Dashboard', icon: <Home size={16} /> },
                { path: '/features/usage-tracking', label: 'Usage Tracking', icon: <TrendingUp size={16} /> },
                { path: '/features/analytics', label: 'Cost Analytics', icon: <Database size={16} /> },
                { path: '/features/optimization', label: 'AI Optimization', icon: <Cpu size={16} /> },
                { path: '/features/predictive-intelligence', label: 'Predictive Intelligence', icon: <Brain size={16} /> },
                { path: '/features/projects', label: 'Projects', icon: <Layers size={16} /> },
                { path: '/features/templates', label: 'Prompt Templates', icon: <FileText size={16} /> },
                { path: '/features/workflows', label: 'Workflows', icon: <Settings size={16} /> },
                { path: '/features/gateway', label: 'Gateway & Proxy', icon: <Cloud size={16} /> },
                { path: '/features/key-vault', label: 'Key Vault', icon: <Key size={16} /> },
                { path: '/features/alerts', label: 'Alerts', icon: <Bell size={16} /> },
                { path: '/features/training', label: 'Training', icon: <Brain size={16} /> },
                { path: '/features/tracing', label: 'Distributed Tracing', icon: <Zap size={16} /> },
            ],
        },
        {
            title: 'API Reference',
            id: 'api',
            icon: <Code size={18} />,
            items: [
                { path: '/api', label: 'Overview', icon: <Code size={16} /> },
                { path: '/api/authentication', label: 'Authentication', icon: <Shield size={16} /> },
                { path: '/api/usage', label: 'Usage API', icon: <TrendingUp size={16} /> },
                { path: '/api/analytics', label: 'Analytics API', icon: <Database size={16} /> },
                { path: '/api/projects', label: 'Projects API', icon: <Layers size={16} /> },
                { path: '/api/optimization', label: 'Optimization API', icon: <Cpu size={16} /> },
                { path: '/api/webhooks', label: 'Webhooks', icon: <Bell size={16} /> },
                { path: '/api/rate-limits', label: 'Rate Limits', icon: <Shield size={16} /> },
            ],
        },
        {
            title: 'Support',
            id: 'support',
            icon: <HelpCircle size={18} />,
            items: [
                { path: '/faq', label: 'FAQ', icon: <HelpCircle size={16} /> },
                { path: '/support', label: 'Contact & Help', icon: <MessageCircle size={16} /> },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <Zap className="text-white" size={24} />
                            </div>
                            <span className="text-xl font-bold text-gradient">Cost Katana</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Search size={18} />
                            <span className="hidden sm:inline text-sm">Search</span>
                            <kbd className="hidden sm:inline px-2 py-1 text-xs bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">
                                ⌘K
                            </kbd>
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a
                            href="https://github.com/Hypothesize-Tech/ai-cost-optimizer-backend"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Github size={20} />
                        </a>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-16 bottom-0 w-72 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border overflow-y-auto transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <nav className="p-4 space-y-2">
                    {navigation.map((section) => (
                        <div key={section.id} className="mb-4">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                                {expandedSections.includes(section.id) ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            <AnimatePresence>
                                {expandedSections.includes(section.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-2 mt-1 space-y-1">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={`sidebar-link ${location.pathname === item.path ? 'active' : ''
                                                        }`}
                                                >
                                                    {item.icon}
                                                    <span className="ml-2">{item.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    {/* External Links */}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="space-y-2">
                            <a
                                href="https://costkatana.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <ExternalLink size={16} />
                                <span>Website</span>
                            </a>
                            <a
                                href="https://www.npmjs.com/package/ai-cost-tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <Package size={16} />
                                <span>NPM Package</span>
                            </a>
                            <a
                                href="https://pypi.org/project/cost-katana/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <Code size={16} />
                                <span>PyPI Package</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-72'}`}>
                <div className="max-w-6xl mx-auto p-6">
                    {children}
                </div>

                {/* Footer */}
                <footer className="mt-16 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-center md:text-left">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    © 2025 Cost Katana. All rights reserved.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    Made with ❤️ by the Cost Katana team
                                </p>
                            </div>

                            <div className="flex space-x-6">
                                <a
                                    href="https://github.com/Hypothesize-Tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href="mailto:abdul@hypothesize.tech"
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    <MessageCircle size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            {/* Mobile Menu Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
