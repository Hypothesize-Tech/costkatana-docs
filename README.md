# Cost Katana Docs 🥷

> **Beautiful documentation for cutting AI costs.**

The official documentation site for Cost Katana—your complete guide to AI cost optimization.

---

## 🚀 Quick Links

| Resource | URL |
|----------|-----|
| **Live Docs** | [docs.costkatana.com](https://docs.costkatana.com) |
| **Dashboard** | [costkatana.com](https://costkatana.com) |
| **Examples** | [github.com/Hypothesize-Tech/costkatana-examples](https://github.com/Hypothesize-Tech/costkatana-examples) |

---

## 📖 What's Inside

### Getting Started
- Installation guides (Node.js, Python, CLI)
- Quick start tutorials
- API key setup

### Core Features
- **Cost Tracking** — Real-time spending analytics
- **Smart Caching** — 100% savings on repeated queries
- **Cortex Optimization** — 40-75% cost reduction
- **Auto-Failover** — Never fail, switch providers automatically
- **Security Firewall** — Block prompt injections

### Integrations
- Framework guides (Express, Next.js, FastAPI, Flask, Django)
- Provider setup (OpenAI, Anthropic, Google, AWS Bedrock)
- Dashboard & analytics

### Observability
- OpenTelemetry integration
- Distributed tracing
- Metrics & error analytics
- Service dependency graphs

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Observability & OpenTelemetry

Cost Katana provides first-class OpenTelemetry support:

### Features
- Distributed tracing (Express, MongoDB, HTTP, GenAI spans)
- RED metrics (rate, errors, duration)
- GenAI metrics (tokens, cost per model)
- Error aggregation with trace correlation
- Service dependency graph

### Vendor Integrations

**Grafana Cloud:**
```bash
OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push
OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_TOKEN>
```

**Datadog:**
```bash
OTLP_HTTP_TRACES_URL=https://trace.agent.datadoghq.com/v0.7/traces
OTLP_HTTP_METRICS_URL=https://api.datadoghq.com/v1/series
OTEL_EXPORTER_OTLP_HEADERS=DD-API-KEY=<YOUR_API_KEY>
```

**New Relic:**
```bash
OTLP_HTTP_TRACES_URL=https://otlp.nr-data.net:4318/v1/traces
OTLP_HTTP_METRICS_URL=https://otlp.nr-data.net:4318/v1/metrics
OTEL_EXPORTER_OTLP_HEADERS=api-key=<YOUR_LICENSE_KEY>
```

### Dashboard Views
- Performance Overview (RPM, error rate, latency, P95)
- Cost Analytics (by model, donut chart + table)
- Error Monitor (recent errors, trace IDs)
- Top Operations & Errors
- Telemetry Explorer (filters, pagination)
- Trace Viewer (hierarchical spans)
- Service Dependency Graph

---

## 📞 Support

| Channel | Link |
|---------|------|
| **Documentation** | [docs.costkatana.com](https://docs.costkatana.com) |
| **GitHub** | [github.com/Hypothesize-Tech](https://github.com/Hypothesize-Tech) |
| **Discord** | [discord.gg/D8nDArmKbY](https://discord.gg/D8nDArmKbY) |
| **Email** | support@costkatana.com |

---

## 📄 License

MIT © Cost Katana
