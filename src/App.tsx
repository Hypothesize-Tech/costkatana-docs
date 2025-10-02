import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const IntroductionPage = lazy(() => import('./pages/getting-started/IntroductionPage'));
const QuickStartPage = lazy(() => import('./pages/getting-started/QuickStartPage'));

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
  APIOverviewPage,
  AuthenticationPage,
  UsageAPIPage,
  AnalyticsAPIPage,
  ProjectsAPIPage,
  OptimizationAPIPage,
  WebhooksPage,
  RateLimitsPage,
  FAQPage,
  SupportPage,
  OpenTelemetryVendorsPage
} from './pages/DocumentationPages';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* Getting Started */}
                <Route path="/getting-started" element={<Navigate to="/getting-started/introduction" replace />} />
                <Route path="/getting-started/introduction" element={<IntroductionPage />} />
                <Route path="/getting-started/quick-start" element={<QuickStartPage />} />
                <Route path="/getting-started/installation" element={<InstallationPage />} />

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
    </HelmetProvider>
  );
};

export default App;