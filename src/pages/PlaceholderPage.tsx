import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, Construction } from 'lucide-react';

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
    return (
        <>
            <Helmet>
                <title>{title} - Cost Katana Documentation</title>
                {description && <meta name="description" content={description} />}
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="card p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                            <Construction className="text-primary-600 dark:text-primary-400" size={40} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    {description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
                    )}


                </div>
            </motion.div>
        </>
    );
};

// Create specific placeholder pages
export const InstallationPage = () => <PlaceholderPage title="Installation" description="Detailed installation instructions" />;
export const IntegrationsOverviewPage = () => <PlaceholderPage title="Integrations Overview" description="Connect Cost Katana with your tools" />;
export const NodeJSPage = () => <PlaceholderPage title="Node.js SDK" description="Integrate Cost Katana with Node.js" />;
export const PythonPage = () => <PlaceholderPage title="Python SDK" description="Integrate Cost Katana with Python" />;
export const ChatGPTPage = () => <PlaceholderPage title="ChatGPT Integration" description="Direct ChatGPT integration" />;
export const FeaturesOverviewPage = () => <PlaceholderPage title="Features Overview" description="Explore all Cost Katana features" />;
export const DashboardPage = () => <PlaceholderPage title="Dashboard" description="Real-time monitoring dashboard" />;
export const UsageTrackingPage = () => <PlaceholderPage title="Usage Tracking" description="Track AI usage across providers" />;
export const CostAnalyticsPage = () => <PlaceholderPage title="Cost Analytics" description="Advanced cost analysis" />;
export const OptimizationPage = () => <PlaceholderPage title="AI Optimization" description="Intelligent cost reduction" />;
export const PredictiveIntelligencePage = () => <PlaceholderPage title="Predictive Intelligence" description="AI-powered forecasting" />;
export const ProjectsPage = () => <PlaceholderPage title="Projects" description="Organize and track projects" />;
export const TemplatesPage = () => <PlaceholderPage title="Prompt Templates" description="Reusable optimized prompts" />;
export const WorkflowsPage = () => <PlaceholderPage title="Agent Trace" description="Monitor and optimize agent traces" />;
export const GatewayPage = () => <PlaceholderPage title="Gateway & Proxy" description="Unified API gateway" />;
export const KeyVaultPage = () => <PlaceholderPage title="Key Vault" description="Secure API key management" />;
export const AlertsPage = () => <PlaceholderPage title="Alerts" description="Proactive monitoring alerts" />;
export const APIOverviewPage = () => <PlaceholderPage title="API Overview" description="Complete API documentation" />;
export const AuthenticationPage = () => <PlaceholderPage title="Authentication" description="JWT and API key auth" />;
export const UsageAPIPage = () => <PlaceholderPage title="Usage API" description="Track AI usage via API" />;
export const AnalyticsAPIPage = () => <PlaceholderPage title="Analytics API" description="Retrieve analytics data" />;
export const ProjectsAPIPage = () => <PlaceholderPage title="Projects API" description="Manage projects via API" />;
export const OptimizationAPIPage = () => <PlaceholderPage title="Optimization API" description="Access optimization features" />;
export const WebhooksPage = () => <PlaceholderPage title="Webhooks" description="Real-time event notifications" />;
export const RateLimitsPage = () => <PlaceholderPage title="Rate Limits" description="API usage limits" />;
export const FAQPage = () => <PlaceholderPage title="FAQ" description="Frequently asked questions" />;
export const SupportPage = () => <PlaceholderPage title="Support" description="Get help and support" />;

export const OpenTelemetryVendorsPage: React.FC = () => {
    return (
        <div className="prose max-w-none dark:prose-invert">
            <h1>OpenTelemetry & Vendor Support</h1>
            <p>
                Cost Katana ships with native OpenTelemetry (OTel) integration for traces and metrics. You can send data to any
                OTLP-compatible backend including Grafana Cloud (Tempo/Prometheus), Datadog, and New Relic.
            </p>

            <h2>Quick Setup</h2>
            <pre><code>{`# Example: Grafana Cloud
OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push
OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_TOKEN>`}</code></pre>

            <h3>Endpoints</h3>
            <ul>
                <li>GET /api/telemetry/metrics</li>
                <li>GET /api/telemetry/dashboard</li>
                <li>GET /api/telemetry/traces/:traceId</li>
                <li>GET /api/telemetry?filters</li>
                <li>GET /api/telemetry/dependencies</li>
                <li>GET /api/telemetry/health</li>
            </ul>

            <h2>Dashboard Coverage</h2>
            <ul>
                <li>KPIs: RPM, Error %, Avg & P95 Latency</li>
                <li>Cost by Model</li>
                <li>Recent Errors, Top Errors</li>
                <li>Top Operations</li>
                <li>Telemetry Explorer (filters + pagination)</li>
                <li>Trace Viewer (hierarchical spans)</li>
                <li>Service Dependency Graph</li>
            </ul>

            <p>
                For detailed setup and local collector instructions, see the backend guide
                (<a href="https://github.com/Hypothesize-Tech/costkatana-backend/blob/main/OBSERVABILITY.md" target="_blank" rel="noreferrer">OBSERVABILITY.md</a>).
            </p>
        </div>
    );
};

export default PlaceholderPage;
