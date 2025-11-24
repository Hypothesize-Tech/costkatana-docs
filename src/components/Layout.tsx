import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Search,
    Moon,
    Sun,
    ChevronDown,
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
    Shield,
    TrendingUp,
    Terminal,
    Key,
    Bell,
    Brain,
    Package,
    Cpu,
    Heart,
    LayoutDashboard,
    BarChart3,
    Sparkles,
    Folder,
    FileCode,
    GitBranch,
    Webhook,
    Bot,
    Activity,
    LineChart,
    Network,
    Globe,
    Film,
    FileText,
    Eye
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchModal from './SearchModal';
import logoImage from '../assets/logo.jpg';

interface NavigationItem {
    path: string;
    label: string;
    icon: React.ReactNode;
    external?: boolean;
}

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
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

    // Handle keyboard shortcut to open/close search modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navigation = [
        {
            title: 'Quick Links',
            id: 'quick-links',
            icon: <ExternalLink size={18} />,
            items: [
                { path: 'https://costkatana.com', label: 'Landing Page', icon: <Home size={16} />, external: true },
                { path: 'https://app.costkatana.com', label: 'Web App', icon: <Zap size={16} />, external: true },
                { path: 'https://www.npmjs.com/package/cost-katana', label: 'NPM Package (Node.js)', icon: <Package size={16} />, external: true },
                { path: 'https://www.npmjs.com/package/cost-katana-cli', label: 'NPM CLI Package', icon: <Terminal size={16} />, external: true },
                { path: 'https://pypi.org/project/cost-katana', label: 'PyPI Package (Python)', icon: <Package size={16} />, external: true },
            ],
        },
        {
            title: 'Getting Started',
            id: 'getting-started',
            icon: <BookOpen size={18} />,
            items: [
                { path: '/getting-started/introduction', label: 'Introduction', icon: <BookOpen size={16} /> },
                { path: '/getting-started/quick-start', label: 'Quick Start', icon: <Zap size={16} /> },
                { path: '/getting-started/installation', label: 'Installation', icon: <Package size={16} /> },
                { path: '/models', label: 'Supported Models', icon: <Cpu size={16} /> },
                { path: '/examples', label: 'Code Examples', icon: <Code size={16} /> },
            ],
        },
        {
            title: 'Integrations',
            id: 'integrations',
            icon: <Plug size={18} />,
            items: [
                { path: '/integrations/cli', label: 'CLI Tool', icon: <Terminal size={16} /> },
                { path: '/integrations/nodejs', label: 'Node.js SDK', icon: <Code size={16} /> },
                { path: '/integrations/python', label: 'Python SDK', icon: <Code size={16} /> },
                { path: '/integrations/chatgpt', label: 'ChatGPT Integration', icon: <Bot size={16} /> },
            ],
        },
        {
            title: 'Features',
            id: 'features',
            icon: <Sparkles size={18} />,
            items: [
                { path: '/features', label: 'Overview', icon: <Layers size={16} /> },
                { path: '/features/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
                { path: '/features/usage-tracking', label: 'Usage Tracking', icon: <TrendingUp size={16} /> },
                { path: '/features/analytics', label: 'Cost Analytics', icon: <BarChart3 size={16} /> },
                { path: '/features/optimization', label: 'AI Optimization', icon: <Sparkles size={16} /> },
                { path: '/features/sast', label: 'SAST Optimization', icon: <Brain size={16} /> },
                { path: '/features/predictive-intelligence', label: 'Predictive Intelligence', icon: <LineChart size={16} /> },
                { path: '/features/projects', label: 'Projects', icon: <Folder size={16} /> },
                { path: '/features/templates', label: 'Prompt Templates', icon: <FileCode size={16} /> },
                { path: '/features/workflows', label: 'Workflows', icon: <GitBranch size={16} /> },
                { path: '/features/gateway', label: 'Gateway & Proxy', icon: <Globe size={16} /> },
                { path: '/features/key-vault', label: 'Key Vault', icon: <Key size={16} /> },
                { path: '/features/alerts', label: 'Alerts', icon: <Bell size={16} /> },
                { path: '/features/tracing', label: 'Distributed Tracing', icon: <Network size={16} /> },
                { path: '/features/telemetry', label: 'Telemetry Dashboard', icon: <Activity size={16} /> },
                { path: '/features/sessions', label: 'Sessions & Replay', icon: <Film size={16} /> },
                { path: '/features/logs', label: 'Logs Management', icon: <FileText size={16} /> },
                { path: '/features/cache', label: 'Cache Management', icon: <Cpu size={16} /> },
                { path: '/features/advanced-monitoring', label: 'Advanced Monitoring', icon: <Eye size={16} /> },
                { path: '/features/unexplained-costs', label: 'Unexplained Costs', icon: <TrendingUp size={16} /> },
                { path: '/features/experimentation', label: 'Experimentation', icon: <Sparkles size={16} /> },
                { path: '/features/moderation', label: 'Moderation', icon: <Shield size={16} /> },
                { path: '/features/security', label: 'Security', icon: <Shield size={16} /> },
                { path: '/features/memory', label: 'Memory', icon: <Brain size={16} /> },
                { path: '/features/cost-lake', label: 'Cost Lake', icon: <BarChart3 size={16} /> },
                { path: '/features/github-integrations', label: 'GitHub Integrations', icon: <GitBranch size={16} /> },
            ],
        },
        {
            title: 'Observability',
            id: 'observability',
            icon: <Activity size={18} />,
            items: [
                { path: '/observability/opentelemetry', label: 'OpenTelemetry & Vendors', icon: <Activity size={16} /> },
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
                { path: '/api/analytics', label: 'Analytics API', icon: <BarChart3 size={16} /> },
                { path: '/api/projects', label: 'Projects API', icon: <Folder size={16} /> },
                { path: '/api/optimization', label: 'Optimization API', icon: <Sparkles size={16} /> },
                { path: '/api/webhooks', label: 'Webhooks', icon: <Webhook size={16} /> },
                { path: '/api/rate-limits', label: 'Rate Limits', icon: <Shield size={16} /> },
                { path: '/api/chat', label: 'Chat API', icon: <MessageCircle size={16} /> },
                { path: '/api/agent', label: 'Agent API', icon: <Bot size={16} /> },
                { path: '/api/memory', label: 'Memory API', icon: <Brain size={16} /> },
                { path: '/api/cache', label: 'Cache API', icon: <Cpu size={16} /> },
                { path: '/api/telemetry', label: 'Telemetry API', icon: <Activity size={16} /> },
                { path: '/api/logs', label: 'Logs API', icon: <FileText size={16} /> },
                { path: '/api/budget', label: 'Budget API', icon: <TrendingUp size={16} /> },
                { path: '/api/session-replay', label: 'Session Replay API', icon: <Film size={16} /> },
                { path: '/api/trace', label: 'Trace API', icon: <Network size={16} /> },
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
        <div className="min-h-screen light:bg-gradient-light-ambient dark:bg-gradient-dark-ambient relative overflow-hidden">
            {/* Ambient glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-accent-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-highlight-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex gap-x-4 items-center px-4 h-16 glass border-b border-primary-200/30 dark:border-primary-700/30 shadow-lg shrink-0 backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8 light:bg-gradient-light-panel dark:bg-gradient-dark-panel">
                <button
                    type="button"
                    className="btn -m-2.5 p-2.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-all duration-300 hover:scale-110 lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <span className="sr-only">Open sidebar</span>
                    {sidebarOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                </button>

                {/* Logo */}
                <div className="flex flex-1 gap-x-4 items-center lg:gap-x-6">
                    <Link to="/" className="flex gap-x-3 items-center group">
                        <div className="flex justify-center items-center w-12 h-12 rounded-xl shadow-lg bg-gradient-primary glow-primary group-hover:scale-105 transition-all duration-300 overflow-hidden">
                            <img
                                src={logoImage}
                                alt="Cost Katana"
                                className="w-full h-full object-contain p-1.5"
                            />
                        </div>
                        <span className="hidden font-display font-bold text-xl gradient-text sm:block group-hover:scale-105 transition-transform duration-300">
                            Cost Katana
                        </span>
                    </Link>
                </div>

                <div className="flex gap-x-2 items-center lg:gap-x-4">
                    {/* Search */}
                    <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className="btn flex items-center gap-x-2 px-4 py-2 glass hover:bg-primary-500/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-all duration-300 hover:scale-110 rounded-xl"
                    >
                        <Search className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm">Search</span>
                        <kbd className="hidden sm:inline px-2 py-1 text-xs bg-light-bg dark:bg-dark-bg-300 rounded border border-gray-300 dark:border-gray-600">
                            ⌘K
                        </kbd>
                    </button>

                    {/* Theme toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="btn p-3 rounded-xl glass hover:bg-primary-500/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5" />
                        )}
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/Hypothesize-Tech/costkatana-backend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl glass hover:bg-primary-500/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-all duration-300 hover:scale-110"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-16 bottom-0 w-72 glass backdrop-blur-xl border-r border-primary-200/30 dark:border-primary-700/30 overflow-y-auto transform transition-transform duration-300 z-40 bg-gradient-light-panel/80 dark:bg-gradient-dark-panel/80 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <nav className="p-4 space-y-1">
                    {navigation.map((section) => (
                        <div key={section.id} className="mb-3">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="btn w-full flex items-center justify-between px-4 py-3 text-sm font-display font-semibold rounded-xl transition-all duration-300 group"
                                style={{
                                    background: expandedSections.includes(section.id)
                                        ? 'linear-gradient(135deg, rgba(6, 236, 158, 0.1), rgba(0, 148, 84, 0.1))'
                                        : 'transparent',
                                    color: expandedSections.includes(section.id)
                                        ? 'rgb(6, 236, 158)'
                                        : 'inherit'
                                }}
                            >
                                <div className="flex items-center gap-x-3">
                                    <div
                                        className={`transition-colors duration-300 ${expandedSections.includes(section.id)
                                            ? 'text-primary-500 dark:text-primary-400'
                                            : 'text-light-text-secondary dark:text-dark-text-secondary group-hover:text-primary-500 dark:group-hover:text-primary-400'
                                            }`}
                                    >
                                        {section.icon}
                                    </div>
                                    <span className="text-light-text-primary dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {section.title}
                                    </span>
                                </div>
                                <div className={`transition-transform duration-300 ${expandedSections.includes(section.id) ? 'rotate-0' : '-rotate-90'
                                    }`}>
                                    <ChevronDown
                                        size={18}
                                        className={`transition-colors duration-300 ${expandedSections.includes(section.id)
                                            ? 'text-primary-500 dark:text-primary-400'
                                            : 'text-light-text-muted dark:text-dark-text-muted group-hover:text-primary-500 dark:group-hover:text-primary-400'
                                            }`}
                                    />
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedSections.includes(section.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-1 mt-2 space-y-1 pl-3 border-l-2 border-primary-200/30 dark:border-primary-700/30">
                                            {section.items.map((item: NavigationItem) => (
                                                item.external ? (
                                                    <a
                                                        key={item.path}
                                                        href={item.path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sidebar-link group"
                                                    >
                                                        <div className="text-light-text-muted dark:text-dark-text-muted group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                                                            {item.icon}
                                                        </div>
                                                        <span className="flex-1">{item.label}</span>
                                                        <ExternalLink
                                                            size={14}
                                                            className="text-light-text-muted dark:text-dark-text-muted group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors opacity-60 group-hover:opacity-100"
                                                        />
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className={`sidebar-link group ${location.pathname === item.path ? 'active' : ''}`}
                                                    >
                                                        <div className={location.pathname === item.path
                                                            ? 'text-white'
                                                            : 'text-light-text-muted dark:text-dark-text-muted group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors'
                                                        }>
                                                            {item.icon}
                                                        </div>
                                                        <span>{item.label}</span>
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto transition-all duration-300 lg:ml-72 relative z-10">
                <div className="pt-24 pb-8">
                    <div className="w-full px-6 sm:px-8 md:px-10 max-w-6xl mx-auto">
                        {children}
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700">
                        <div className="max-w-6xl mx-auto px-6 py-8">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                    <Link to="/" className="flex items-center gap-2 group">
                                        <div className="flex justify-center items-center w-10 h-10 rounded-lg shadow-md bg-gradient-primary glow-primary group-hover:scale-105 transition-all duration-300 overflow-hidden">
                                            <img
                                                src={logoImage}
                                                alt="Cost Katana"
                                                className="w-full h-full object-contain p-1.5"
                                            />
                                        </div>
                                        <span className="font-display font-bold text-lg gradient-text">
                                            Cost Katana
                                        </span>
                                    </Link>
                                    <div>
                                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                            © 2025 Cost Katana. All rights reserved.
                                        </p>
                                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1 flex items-center justify-center md:justify-start">
                                            Made with <Heart size={12} className="inline-block mx-1 text-red-500" fill="currentColor" /> by the Cost Katana team
                                        </p>
                                    </div>
                                </div>

                                <div className="flex space-x-6">
                                    <a
                                        href="https://github.com/Hypothesize-Tech"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a
                                        href="mailto:support@costkatana.com"
                                        className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                                    >
                                        <MessageCircle size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
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
