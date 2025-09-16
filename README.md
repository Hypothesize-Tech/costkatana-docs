# Cost Katana Docs — Observability & OpenTelemetry

Cost Katana provides first‑class OpenTelemetry (OTel) support for traces, metrics, and error analytics across AI workloads. This document summarizes setup, vendor integrations, and the in‑product telemetry dashboard.

## Features
- Distributed tracing (Express, MongoDB, HTTP, GenAI spans)
- RED metrics (rate, errors, duration) and GenAI metrics (tokens, cost)
- Error aggregation and trace correlation
- Service dependency graph
- Frontend telemetry dashboard (KPIs, cost by model, top operations/errors, errors, explorer, traces)

## Vendor Integrations (OTLP HTTP)
- Grafana Cloud (Tempo/Prometheus), Datadog, New Relic, and any OTLP‑compatible backend

### Grafana Cloud
```env
OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push
OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_TOKEN>
```

### Datadog
```env
OTLP_HTTP_TRACES_URL=https://trace.agent.datadoghq.com/v0.7/traces
OTLP_HTTP_METRICS_URL=https://api.datadoghq.com/v1/series
OTEL_EXPORTER_OTLP_HEADERS=DD-API-KEY=<YOUR_API_KEY>
```

### New Relic
```env
OTLP_HTTP_TRACES_URL=https://otlp.nr-data.net:4318/v1/traces
OTLP_HTTP_METRICS_URL=https://otlp.nr-data.net:4318/v1/metrics
OTEL_EXPORTER_OTLP_HEADERS=api-key=<YOUR_LICENSE_KEY>
```

## Local Development
- Use the OTel Collector locally for dev: health at `:13133/health`, Prometheus scrape at `:9464/metrics`
- See `costkatana-backend/OBSERVABILITY.md` for Docker commands (Tempo, Prometheus, Grafana)

## Backend Endpoints
- `GET /api/telemetry/metrics`
- `GET /api/telemetry/dashboard`
- `GET /api/telemetry/traces/:traceId`
- `GET /api/telemetry?{filters}`
- `GET /api/telemetry/dependencies`
- `GET /api/telemetry/health`

## Frontend Dashboard (What You’ll See)
- Performance Overview (RPM, error rate %, avg latency, P95)
- Cost Analytics (donut by model + table)
- Error Monitor (last errors, copy trace ID)
- Top Operations / Top Errors (aggregated lists)
- Telemetry Explorer (filters, pagination)
- Trace Viewer (hierarchical spans)
- Service Dependency Graph (service → service edges)

## Privacy & Security
- Sensitive content is redacted by default
- Region routing and TLS supported

For full details and troubleshooting, refer to the backend guide: `costkatana-backend/OBSERVABILITY.md`.
