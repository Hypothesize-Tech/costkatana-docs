import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Zap, TrendingUp, Shield, Code, Cloud, Brain,
    ArrowRight, CheckCircle, Star, Users, Globe,
    BarChart3, Cpu, Database, Terminal, Package,
    Github, BookOpen, MessageCircle
} from 'lucide-react';

const HomePage: React.FC = () => {
    const features = [
        {
            icon: <TrendingUp className="text-blue-600" />,
            title: 'Real-time Cost Tracking',
            description: 'Monitor your AI costs across all providers in real-time with detailed breakdowns.',
        },
        {
            icon: <Brain className="text-purple-600" />,
            title: 'AI-Powered Optimization',
            description: 'Leverage AI to automatically optimize your prompts and reduce costs by up to 70%.',
        },
        {
            icon: <Shield className="text-green-600" />,
            title: 'Secure Key Management',
            description: 'Enterprise-grade security for your API keys with encrypted vault storage.',
        },
        {
            icon: <Cloud className="text-indigo-600" />,
            title: 'Unified Gateway',
            description: 'Single endpoint for all AI providers with automatic failover and load balancing.',
        },
        {
            icon: <BarChart3 className="text-orange-600" />,
            title: 'Advanced Analytics',
            description: 'Deep insights into usage patterns, cost trends, and optimization opportunities.',
        },
        {
            icon: <Cpu className="text-pink-600" />,
            title: 'Model Comparison',
            description: 'Compare costs and performance across different AI models and providers.',
        },
    ];

    const stats = [
        { value: '70%', label: 'Cost Reduction' },
        { value: '10M+', label: 'API Calls Tracked' },
        { value: '500+', label: 'Happy Customers' },
        { value: '24/7', label: 'Support' },
    ];

    const quickLinks = [
        {
            title: 'Quick Start Guide',
            description: 'Get up and running in under 5 minutes',
            link: '/getting-started/quick-start',
            icon: <Zap />,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'API Documentation',
            description: 'Complete API reference and examples',
            link: '/api',
            icon: <Code />,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Integration Guides',
            description: 'Connect with your favorite frameworks',
            link: '/integrations',
            icon: <Package />,
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Feature Overview',
            description: 'Explore all Cost Katana features',
            link: '/features',
            icon: <Database />,
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Cost Katana Documentation - AI Cost Optimization Platform</title>
                <meta name="description" content="Complete documentation for Cost Katana - the world's first AI-powered cost optimization platform for AI usage." />
            </Helmet>

            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 text-center py-20 px-4"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                                <Zap className="text-white" size={48} />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="text-gradient">Cost Katana</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            The world's first AI-powered cost optimization platform for AI usage.
                            Save up to 70% on your AI costs while improving performance.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link to="/getting-started/quick-start" className="btn-primary flex items-center space-x-2">
                                <BookOpen size={20} />
                                <span>Get Started</span>
                                <ArrowRight size={20} />
                            </Link>

                            <a
                                href="https://github.com/Hypothesize-Tech/ai-cost-optimizer-backend"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary flex items-center space-x-2"
                            >
                                <Github size={20} />
                                <span>View on GitHub</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="card p-4"
                                >
                                    <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Quick Links */}
                <section className="py-16 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="group"
                                >
                                    <Link to={link.link} className="block h-full">
                                        <div className="card p-6 h-full hover-lift group-hover:border-primary-300 dark:group-hover:border-primary-700 transition-all">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                                                {link.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                {link.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {link.description}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                            Everything you need to optimize, track, and manage your AI costs in one platform.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * index }}
                                    className="card p-6 hover-lift"
                                >
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Integration Section */}
                <section className="py-16 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold mb-8">Easy Integration</h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="card p-6">
                                <Terminal className="text-green-600 mb-4" size={32} />
                                <h3 className="font-semibold mb-2">CLI Tool</h3>
                                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    npm i -g ai-cost-optimizer-cli
                                </code>
                            </div>

                            <div className="card p-6">
                                <Package className="text-blue-600 mb-4" size={32} />
                                <h3 className="font-semibold mb-2">Node.js SDK</h3>
                                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    npm i ai-cost-tracker
                                </code>
                            </div>

                            <div className="card p-6">
                                <Code className="text-purple-600 mb-4" size={32} />
                                <h3 className="font-semibold mb-2">Python SDK</h3>
                                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                    pip install cost-katana
                                </code>
                            </div>
                        </div>

                        <Link to="/integrations" className="btn-primary inline-flex items-center space-x-2">
                            <span>View All Integrations</span>
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 bg-gradient-to-br from-primary-600 to-blue-600 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your AI Costs?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join hundreds of companies saving millions on their AI infrastructure.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/getting-started/quick-start"
                                className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Start Free Trial
                            </Link>

                            <a
                                href="https://costkatana.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                            >
                                Visit Website
                            </a>
                        </div>
                    </motion.div>
                </section>
            </div>
        </>
    );
};

export default HomePage;
