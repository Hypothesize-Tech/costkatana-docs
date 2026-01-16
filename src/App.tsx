import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReadingProvider } from './contexts/ReadingContext';
import { TOCProvider } from './contexts/TOCContext';
import { DocsAnalyticsProvider } from './contexts/DocsAnalyticsContext';
import { CommunityProvider } from './contexts/CommunityContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy load all pages for better performance and code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const IntroductionPage = lazy(() => import('./pages/getting-started/IntroductionPage'));
const QuickStartPage = lazy(() => import('./pages/getting-started/QuickStartPage'));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage'));
const SupportedModelsPage = lazy(() => import('./pages/SupportedModelsPage'));

// Lazy load documentation pages
const InstallationPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.InstallationPage })));
const CLIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CLIPage })));
const NodeJSPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.NodeJSPage })));
const PythonPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.PythonPage })));
const ChatGPTPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ChatGPTPage })));
const FeaturesOverviewPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.FeaturesOverviewPage })));
const DashboardPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.DashboardPage })));
const UsageTrackingPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.UsageTrackingPage })));
const CostAnalyticsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CostAnalyticsPage })));
const OptimizationPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.OptimizationPage })));
const PredictiveIntelligencePage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.PredictiveIntelligencePage })));
const ProjectsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ProjectsPage })));
const TemplatesPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.TemplatesPage })));
const WorkflowsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.WorkflowsPage })));
const GatewayPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.GatewayPage })));
const KeyVaultPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.KeyVaultPage })));
const AlertsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.AlertsPage })));
const TracingPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.TracingPage })));
const SastPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SastPage })));
const TelemetryDashboardPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.TelemetryDashboardPage })));
const SessionsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SessionsPage })));
const LogsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.LogsPage })));
const CachePage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CachePage })));
const AdvancedMonitoringPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.AdvancedMonitoringPage })));
const UnexplainedCostsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.UnexplainedCostsPage })));
const ExperimentationPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ExperimentationPage })));
const ModerationPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ModerationPage })));
const SecurityPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SecurityPage })));
const MemoryPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.MemoryPage })));
const CostLakePage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CostLakePage })));
const GitHubIntegrationsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.GitHubIntegrationsPage })));
const APIOverviewPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.APIOverviewPage })));
const AuthenticationPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.AuthenticationPage })));
const UsageAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.UsageAPIPage })));
const AnalyticsAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.AnalyticsAPIPage })));
const ProjectsAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ProjectsAPIPage })));
const OptimizationAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.OptimizationAPIPage })));
const WebhooksPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.WebhooksPage })));
const RateLimitsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.RateLimitsPage })));
const ChatAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ChatAPIPage })));
const AgentAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.AgentAPIPage })));
const MemoryAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.MemoryAPIPage })));
const CacheAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CacheAPIPage })));
const TelemetryAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.TelemetryAPIPage })));
const LogsAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.LogsAPIPage })));
const BudgetAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.BudgetAPIPage })));
const SessionReplayAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SessionReplayAPIPage })));
const TraceAPIPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.TraceAPIPage })));
const FAQPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.FAQPage })));
const SupportPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SupportPage })));
const OpenTelemetryVendorsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.OpenTelemetryVendorsPage })));
const SDKGeneratorPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.SDKGeneratorPage })));
const IntegrationWizardPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.IntegrationWizardPage })));
const APIExplorerPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.APIExplorerPage })));
const VersionComparisonPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.VersionComparisonPage })));

// Architecture pages
const ArchitectureOverviewPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ArchitectureOverviewPage })));
const ArchitectureDecisionsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ArchitectureDecisionsPage })));
const CostPerformanceTradeoffsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.CostPerformanceTradeoffsPage })));
const FailureDomainsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.FailureDomainsPage })));
const ArchitectureMetricsPage = lazy(() => import('./pages/DocumentationPages').then(module => ({ default: module.ArchitectureMetricsPage })));

// Community pages
const CommunityExamplesPage = lazy(() => import('./pages/community/ExamplesPage').then(module => ({ default: module.ExamplesPage })));
const CommunityDiscussionsPage = lazy(() => import('./pages/community/DiscussionsPage').then(module => ({ default: module.DiscussionsPage })));

// Admin pages
const AdminChatPage = lazy(() => import('./pages/admin/AdminChatPage').then(module => ({ default: module.AdminChatPage })));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ReadingProvider>
          <TOCProvider>
            <DocsAnalyticsProvider>
              <CommunityProvider>
                <Router>
                  <ErrorBoundary>
                    <Layout>
                      <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                          {/* Home */}
                          <Route path="/" element={<HomePage />} />

                          {/* Getting Started */}
                          <Route path="/getting-started" element={<Navigate to="/getting-started/introduction" replace />} />
                          <Route path="/getting-started/introduction" element={<IntroductionPage />} />
                          <Route path="/getting-started/quick-start" element={<QuickStartPage />} />
                          <Route path="/getting-started/installation" element={<InstallationPage />} />

                          {/* Examples */}
                          <Route path="/examples" element={<ExamplesPage />} />

                          {/* Models */}
                          <Route path="/models" element={<SupportedModelsPage />} />

                          {/* Integrations */}
                          <Route path="/integrations/cli" element={<CLIPage />} />
                          <Route path="/integrations/nodejs" element={<NodeJSPage />} />
                          <Route path="/integrations/python" element={<PythonPage />} />
                          <Route path="/integrations/chatgpt" element={<ChatGPTPage />} />
                          <Route path="/integrations/wizard" element={<IntegrationWizardPage />} />
                          <Route path="/integrations/sdk-generator" element={<SDKGeneratorPage />} />

                          {/* Features */}
                          <Route path="/features" element={<FeaturesOverviewPage />} />
                          <Route path="/features/dashboard" element={<DashboardPage />} />
                          <Route path="/features/usage-tracking" element={<UsageTrackingPage />} />
                          <Route path="/features/analytics" element={<CostAnalyticsPage />} />
                          <Route path="/features/optimization" element={<OptimizationPage />} />
                          <Route path="/features/sast" element={<SastPage />} />
                          <Route path="/features/predictive-intelligence" element={<PredictiveIntelligencePage />} />
                          <Route path="/features/projects" element={<ProjectsPage />} />
                          <Route path="/features/templates" element={<TemplatesPage />} />
                          <Route path="/features/workflows" element={<WorkflowsPage />} />
                          <Route path="/features/gateway" element={<GatewayPage />} />
                          <Route path="/features/key-vault" element={<KeyVaultPage />} />
                          <Route path="/features/alerts" element={<AlertsPage />} />
                          <Route path="/features/tracing" element={<TracingPage />} />
                          <Route path="/features/telemetry" element={<TelemetryDashboardPage />} />
                          <Route path="/features/sessions" element={<SessionsPage />} />
                          <Route path="/features/logs" element={<LogsPage />} />
                          <Route path="/features/cache" element={<CachePage />} />
                          <Route path="/features/advanced-monitoring" element={<AdvancedMonitoringPage />} />
                          <Route path="/features/unexplained-costs" element={<UnexplainedCostsPage />} />
                          <Route path="/features/experimentation" element={<ExperimentationPage />} />
                          <Route path="/features/moderation" element={<ModerationPage />} />
                          <Route path="/features/security" element={<SecurityPage />} />
                          <Route path="/features/memory" element={<MemoryPage />} />
                          <Route path="/features/cost-lake" element={<CostLakePage />} />
                          <Route path="/features/github-integrations" element={<GitHubIntegrationsPage />} />

                          {/* Observability */}
                          <Route path="/observability/opentelemetry" element={<OpenTelemetryVendorsPage />} />

                          {/* Architecture */}
                          <Route path="/architecture" element={<ArchitectureOverviewPage />} />
                          <Route path="/architecture/decisions" element={<ArchitectureDecisionsPage />} />
                          <Route path="/architecture/cost-performance" element={<CostPerformanceTradeoffsPage />} />
                          <Route path="/architecture/failure-domains" element={<FailureDomainsPage />} />
                          <Route path="/architecture/metrics" element={<ArchitectureMetricsPage />} />

                          {/* API Reference */}
                          <Route path="/api" element={<APIOverviewPage />} />
                          <Route path="/api/explorer" element={<APIExplorerPage />} />
                          <Route path="/api/authentication" element={<AuthenticationPage />} />
                          <Route path="/api/usage" element={<UsageAPIPage />} />
                          <Route path="/api/analytics" element={<AnalyticsAPIPage />} />
                          <Route path="/api/projects" element={<ProjectsAPIPage />} />
                          <Route path="/api/optimization" element={<OptimizationAPIPage />} />
                          <Route path="/api/webhooks" element={<WebhooksPage />} />
                          <Route path="/api/rate-limits" element={<RateLimitsPage />} />
                          <Route path="/api/chat" element={<ChatAPIPage />} />
                          <Route path="/api/agent" element={<AgentAPIPage />} />
                          <Route path="/api/memory" element={<MemoryAPIPage />} />
                          <Route path="/api/cache" element={<CacheAPIPage />} />
                          <Route path="/api/telemetry" element={<TelemetryAPIPage />} />
                          <Route path="/api/logs" element={<LogsAPIPage />} />
                          <Route path="/api/budget" element={<BudgetAPIPage />} />
                          <Route path="/api/session-replay" element={<SessionReplayAPIPage />} />
                          <Route path="/api/trace" element={<TraceAPIPage />} />

                          {/* Support */}
                          <Route path="/faq" element={<FAQPage />} />
                          <Route path="/support" element={<SupportPage />} />
                          <Route path="/tools/version-comparison" element={<VersionComparisonPage />} />

                          {/* Community */}
                          <Route path="/community/examples" element={<CommunityExamplesPage />} />
                          <Route path="/community/discussions" element={<CommunityDiscussionsPage />} />

                          {/* Admin */}
                          <Route path="/admin/chat" element={<AdminChatPage />} />

                          {/* 404 Page */}
                          <Route path="/404" element={<NotFoundPage />} />

                          {/* Catch all */}
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </Suspense>
                    </Layout>
                    <Toaster
                      position="bottom-right"
                      toastOptions={{
                        className: 'dark:bg-gray-800 dark:text-white',
                        duration: 3000,
                      }}
                    />
                  </ErrorBoundary>
                </Router>
              </CommunityProvider>
            </DocsAnalyticsProvider>
          </TOCProvider>
        </ReadingProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;