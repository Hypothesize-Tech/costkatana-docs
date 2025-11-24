import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const IntroductionPage = lazy(() => import('./pages/getting-started/IntroductionPage'));
const QuickStartPage = lazy(() => import('./pages/getting-started/QuickStartPage'));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage'));
const SupportedModelsPage = lazy(() => import('./pages/SupportedModelsPage'));

// Import documentation pages with real content
import {
  InstallationPage,
  CLIPage,
  NodeJSPage,
  PythonPage,
  ChatGPTPage,
  FeaturesOverviewPage,
  DashboardPage,
  UsageTrackingPage,
  CostAnalyticsPage,
  OptimizationPage,
  PredictiveIntelligencePage,
  ProjectsPage,
  TemplatesPage,
  WorkflowsPage,
  GatewayPage,
  KeyVaultPage,
  AlertsPage,
  TracingPage,
  SastPage,
  TelemetryDashboardPage,
  SessionsPage,
  LogsPage,
  CachePage,
  AdvancedMonitoringPage,
  UnexplainedCostsPage,
  ExperimentationPage,
  ModerationPage,
  SecurityPage,
  MemoryPage,
  CostLakePage,
  GitHubIntegrationsPage,
  APIOverviewPage,
  AuthenticationPage,
  UsageAPIPage,
  AnalyticsAPIPage,
  ProjectsAPIPage,
  OptimizationAPIPage,
  WebhooksPage,
  RateLimitsPage,
  ChatAPIPage,
  AgentAPIPage,
  MemoryAPIPage,
  CacheAPIPage,
  TelemetryAPIPage,
  LogsAPIPage,
  BudgetAPIPage,
  SessionReplayAPIPage,
  TraceAPIPage,
  FAQPage,
  SupportPage,
  OpenTelemetryVendorsPage
} from './pages/DocumentationPages';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
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

                  {/* API Reference */}
                  <Route path="/api" element={<APIOverviewPage />} />
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
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;