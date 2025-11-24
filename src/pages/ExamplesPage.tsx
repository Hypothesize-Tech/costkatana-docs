import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Code, Terminal, FileCode, Layers, BookOpen, Rocket, DollarSign, Bell, Bot, Lock } from 'lucide-react';

const ExamplesPage: React.FC = () => {
    return (
        <div className="min-h-screen light:bg-gradient-light-ambient dark:bg-gradient-dark-ambient relative">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
                        Code Examples
                    </h1>
                    <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-6">
                        Production-ready examples for every Cost Katana feature. Over 300+ code samples across TypeScript, Python, and HTTP APIs.
                    </p>
                    <a
                        href="https://github.com/Hypothesize-Tech/costkatana-examples"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary inline-flex items-center px-6 py-3"
                    >
                        <Github className="mr-2" size={20} />
                        Browse Examples on GitHub
                        <ExternalLink className="ml-2" size={16} />
                    </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    <div className="p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-display font-bold gradient-text mb-2">300+</div>
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Code Examples</div>
                    </div>
                    <div className="p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-display font-bold gradient-text mb-2">44</div>
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Features Covered</div>
                    </div>
                    <div className="p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-display font-bold gradient-text mb-2">3</div>
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Languages</div>
                    </div>
                    <div className="p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="text-3xl font-display font-bold gradient-text mb-2">5</div>
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Frameworks</div>
                    </div>
                </div>

                {/* Languages & Methods */}
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">Available in Multiple Languages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card-hover p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="p-3 rounded-xl bg-gradient-primary/10 inline-block mb-4">
                                <Code className="text-primary-600 dark:text-primary-400" size={32} />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">TypeScript/Node.js</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                Complete SDK examples with full type safety and production-ready patterns.
                            </p>
                            <a
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/1-cost-tracking/npm-package"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center font-semibold"
                            >
                                View TypeScript Examples
                                <ExternalLink className="ml-1" size={14} />
                            </a>
                        </div>

                        <div className="card-hover p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="p-3 rounded-xl bg-gradient-primary/10 inline-block mb-4">
                                <Terminal className="text-primary-600 dark:text-primary-400" size={32} />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Python SDK</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                Pythonic examples with the Cost Katana SDK and FastAPI integrations.
                            </p>
                            <a
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/8-python-sdk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center font-semibold"
                            >
                                View Python Examples
                                <ExternalLink className="ml-1" size={14} />
                            </a>
                        </div>

                        <div className="card-hover p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="p-3 rounded-xl bg-gradient-primary/10 inline-block mb-4">
                                <FileCode className="text-primary-600 dark:text-primary-400" size={32} />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">HTTP REST APIs</h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                Direct API calls you can test immediately with REST Client for VS Code.
                            </p>
                            <a
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/1-cost-tracking/http-headers"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center font-semibold"
                            >
                                View HTTP Examples
                                <ExternalLink className="ml-1" size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Popular Examples by Category */}
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">Popular Examples by Category</h2>

                    {/* Cost Management */}
                    <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                            <DollarSign className="mr-2 text-primary-600 dark:text-primary-400" size={24} />
                            Cost Management
                        </h3>
                        <div className="space-y-3">
                            <ExampleLink
                                title="Cost Tracking"
                                description="Monitor costs across all AI providers with automatic tracking"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/1-cost-tracking"
                            />
                            <ExampleLink
                                title="Budget Management"
                                description="Set spending limits and get alerts when approaching budgets"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/19-budgets"
                            />
                            <ExampleLink
                                title="Cost Analytics"
                                description="Analyze spending patterns and trends with detailed analytics"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/5-analytics"
                            />
                        </div>
                    </div>

                    {/* Performance & Optimization */}
                    <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                            <Rocket className="mr-2 text-primary-600 dark:text-primary-400" size={24} />
                            Performance & Optimization
                        </h3>
                        <div className="space-y-3">
                            <ExampleLink
                                title="Semantic Caching"
                                description="Cache similar requests with semantic matching (30-40% cost savings)"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/14-cache"
                                badge="70-90% hit rate"
                            />
                            <ExampleLink
                                title="Cortex Optimization"
                                description="AI-powered prompt compression with the Cortex meta-language"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/4-cortex"
                                badge="30-40% savings"
                            />
                            <ExampleLink
                                title="Model Routing"
                                description="Automatically route to optimal models based on request characteristics"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/40-model-routing"
                            />
                            <ExampleLink
                                title="Model Comparison & Selection"
                                description="Compare costs and performance across 400+ AI models from 10 providers"
                                href="/models"
                                badge="400+ models"
                            />
                            <ExampleLink
                                title="Type-Safe Model Constants"
                                description="Use type-safe constants to prevent typos and get autocomplete support"
                                href="/getting-started/quick-start#option-4-using-type-safe-constants-recommended-for-typescript"
                                badge="TypeScript/Python"
                            />
                        </div>
                    </div>

                    {/* Monitoring & Alerts */}
                    <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                            <Bell className="mr-2 text-primary-600 dark:text-primary-400" size={24} />
                            Monitoring & Alerts
                        </h3>
                        <div className="space-y-3">
                            <ExampleLink
                                title="Webhooks"
                                description="Real-time event notifications for 65+ event types"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/10-webhooks"
                                badge="65+ events"
                            />
                            <ExampleLink
                                title="OpenTelemetry"
                                description="Distributed tracing and metrics export with full observability"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/11-observability"
                            />
                            <ExampleLink
                                title="Custom Alerts"
                                description="Configure custom alert rules for costs, performance, and security"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/42-alerts"
                            />
                        </div>
                    </div>

                    {/* AI Orchestration */}
                    <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                            <Bot className="mr-2 text-primary-600 dark:text-primary-400" size={24} />
                            AI Orchestration
                        </h3>
                        <div className="space-y-3">
                            <ExampleLink
                                title="Workflows"
                                description="Multi-step AI orchestration with parallel execution and error handling"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/13-workflows"
                            />
                            <ExampleLink
                                title="AI Agents"
                                description="Create and manage AI agents with persistent context"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/27-agents"
                            />
                            <ExampleLink
                                title="Agent Memory"
                                description="Persistent memory storage for AI agents across conversations"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/20-memory"
                            />
                        </div>
                    </div>

                    {/* Security & Compliance */}
                    <div className="mb-8">
                        <h3 className="text-xl font-display font-semibold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                            <Lock className="mr-2 text-primary-600 dark:text-primary-400" size={24} />
                            Security & Compliance
                        </h3>
                        <div className="space-y-3">
                            <ExampleLink
                                title="Key Vault"
                                description="Secure API key management with proxy keys and rate limiting"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/15-key-vault"
                            />
                            <ExampleLink
                                title="Guardrails"
                                description="Content moderation, PII detection, and policy enforcement"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/12-guardrails"
                            />
                            <ExampleLink
                                title="Audit Logs"
                                description="Complete audit trail for compliance and security monitoring"
                                href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/37-audit-logs"
                            />
                        </div>
                    </div>
                </div>

                {/* Framework Integrations */}
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6 flex items-center text-light-text-primary dark:text-dark-text-primary">
                        <Layers className="mr-2 text-primary-600 dark:text-primary-400" size={28} />
                        Framework Integrations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FrameworkCard
                            name="Express.js"
                            description="REST API server with middleware integration"
                            href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/7-frameworks/express"
                        />
                        <FrameworkCard
                            name="Next.js"
                            description="API routes and server components"
                            href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/7-frameworks/nextjs"
                        />
                        <FrameworkCard
                            name="Fastify"
                            description="High-performance web framework integration"
                            href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/7-frameworks/fastify"
                        />
                        <FrameworkCard
                            name="NestJS"
                            description="Enterprise-grade application framework"
                            href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/7-frameworks/nestjs"
                        />
                        <FrameworkCard
                            name="FastAPI"
                            description="Modern Python web framework"
                            href="https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/7-frameworks"
                        />
                    </div>
                </div>

                {/* Complete Feature List */}
                <div className="mb-12 p-6 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-lg">
                    <h2 className="text-2xl font-display font-bold mb-4 flex items-center text-light-text-primary dark:text-dark-text-primary">
                        <BookOpen className="mr-2 text-primary-600 dark:text-primary-400" size={28} />
                        Complete Feature Index
                    </h2>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                        Browse all 44 features with examples in HTTP, TypeScript, Python, and framework integrations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {features.map((feature, index) => (
                            <a
                                key={index}
                                href={`https://github.com/Hypothesize-Tech/costkatana-examples/tree/master/${feature.folder}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-hover flex items-center p-3 rounded-lg glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel hover:border-primary-400/50 dark:hover:border-primary-500/50 transition-all duration-300"
                            >
                                <span className="font-mono text-sm text-light-text-muted dark:text-dark-text-muted mr-3 w-8">{feature.number}</span>
                                <span className="text-sm flex-1 text-light-text-primary dark:text-dark-text-primary">{feature.name}</span>
                                <ExternalLink className="text-light-text-muted dark:text-dark-text-muted" size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Getting Started */}
                <div className="p-8 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-primary shadow-xl">
                    <h2 className="text-2xl font-display font-bold mb-4 text-white">Ready to Get Started?</h2>
                    <p className="mb-6 text-white/90">
                        Clone the examples repository and start building with Cost Katana in minutes.
                    </p>
                    <div className="space-y-2 bg-black/20 p-4 rounded-lg font-mono text-sm mb-6 backdrop-blur-sm border border-white/10">
                        <div className="text-white/90"># Clone the repository</div>
                        <div className="text-white">git clone https://github.com/Hypothesize-Tech/costkatana-examples.git</div>
                        <div className="mt-2 text-white/90"># Install dependencies</div>
                        <div className="text-white">cd costkatana-examples</div>
                        <div className="text-white">npm install</div>
                        <div className="mt-2 text-white/90"># Set your API key</div>
                        <div className="text-white">export COST_KATANA_API_KEY=your_key_here</div>
                        <div className="mt-2 text-white/90"># Run an example</div>
                        <div className="text-white">npx ts-node 1-cost-tracking/npm-package/openai.ts</div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://github.com/Hypothesize-Tech/costkatana-examples"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                        >
                            <Github className="mr-2" size={20} />
                            View on GitHub
                        </a>
                        <Link
                            to="/getting-started/quick-start"
                            className="btn btn-outline inline-flex items-center px-6 py-3 text-white border-white hover:bg-white hover:text-primary-600 transition-colors font-semibold"
                        >
                            Read Quick Start Guide
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const ExampleLink: React.FC<{ title: string; description: string; href: string; badge?: string }> = ({ title, description, href, badge }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover block p-4 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel hover:border-primary-400/50 dark:hover:border-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
        <div className="flex items-start justify-between mb-2">
            <h4 className="font-display font-semibold text-primary-600 dark:text-primary-400">{title}</h4>
            {badge && (
                <span className="px-2 py-1 text-xs rounded-lg glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-primary/10 text-primary-700 dark:text-primary-300">
                    {badge}
                </span>
            )}
        </div>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">{description}</p>
        <span className="text-xs text-primary-600 dark:text-primary-400 flex items-center font-semibold">
            View Examples <ExternalLink className="ml-1" size={12} />
        </span>
    </a>
);

const FrameworkCard: React.FC<{ name: string; description: string; href: string }> = ({ name, description, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover p-4 rounded-xl glass border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel hover:border-primary-400/50 dark:hover:border-primary-500/50 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
        <h4 className="font-display font-semibold mb-2 flex items-center justify-between text-light-text-primary dark:text-dark-text-primary">
            {name}
            <ExternalLink className="text-light-text-muted dark:text-dark-text-muted" size={16} />
        </h4>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{description}</p>
    </a>
);

// Feature list data
const features = [
    { number: "1", name: "Cost Tracking", folder: "1-cost-tracking" },
    { number: "2", name: "Gateway", folder: "2-gateway" },
    { number: "4", name: "Cortex", folder: "4-cortex" },
    { number: "5", name: "Analytics", folder: "5-analytics" },
    { number: "7", name: "Frameworks", folder: "7-frameworks" },
    { number: "8", name: "Python SDK", folder: "8-python-sdk" },
    { number: "9", name: "CLI", folder: "9-cli" },
    { number: "10", name: "Webhooks", folder: "10-webhooks" },
    { number: "11", name: "Observability", folder: "11-observability" },
    { number: "12", name: "Guardrails", folder: "12-guardrails" },
    { number: "13", name: "Workflows", folder: "13-workflows" },
    { number: "14", name: "Cache", folder: "14-cache" },
    { number: "15", name: "Key Vault", folder: "15-key-vault" },
    { number: "16", name: "Security", folder: "16-security" },
    { number: "17", name: "Monitoring", folder: "17-monitoring" },
    { number: "18", name: "Projects", folder: "18-projects" },
    { number: "19", name: "Budgets", folder: "19-budgets" },
    { number: "20", name: "Memory", folder: "20-memory" },
    { number: "21", name: "Templates", folder: "21-templates" },
    { number: "22", name: "Feedback", folder: "22-feedback" },
    { number: "23", name: "Tagging", folder: "23-tagging" },
    { number: "24", name: "Experiments", folder: "24-experiments" },
    { number: "25", name: "Notebooks", folder: "25-notebooks" },
    { number: "26", name: "CKQL", folder: "26-ckql" },
    { number: "27", name: "Agents", folder: "27-agents" },
    { number: "28", name: "MFA", folder: "28-mfa" },
    { number: "29", name: "Moderation", folder: "29-moderation" },
    { number: "30", name: "Unexplained Costs", folder: "30-unexplained-costs" },
    { number: "31", name: "Cortex Training", folder: "31-cortex-training" },
    { number: "32", name: "Email Tracking", folder: "32-email-tracking" },
    { number: "33", name: "AI Cost Monitoring", folder: "33-ai-cost-monitoring" },
    { number: "34", name: "Ingestion", folder: "34-ingestion" },
    { number: "35", name: "User Telemetry", folder: "35-user-telemetry" },
    { number: "36", name: "Team Management", folder: "36-team-management" },
    { number: "37", name: "Audit Logs", folder: "37-audit-logs" },
    { number: "38", name: "Rate Limiting", folder: "38-rate-limiting" },
    { number: "39", name: "Failover", folder: "39-failover" },
    { number: "40", name: "Model Routing", folder: "40-model-routing" },
    { number: "41", name: "Cost Optimization", folder: "41-cost-optimization" },
    { number: "42", name: "Alerts", folder: "42-alerts" },
    { number: "43", name: "Reports", folder: "43-reports" },
    { number: "44", name: "Integrations", folder: "44-integrations" },
];

export default ExamplesPage;

