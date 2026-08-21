# FluxBot AI - Secure Finance Operations Starter

## File Structure

- `/home/runner/work/Leetcode/Leetcode/fluxbot-ai/database/migrations/0001_fluxbot_foundation.sql`: PostgreSQL schema for ledger, reconciliation, close workflows, RBAC users, and immutable audit logging.
- `/home/runner/work/Leetcode/Leetcode/fluxbot-ai/backend/src`: NestJS modular backend with secure reconciliation, month-close, cash-flow, and audit API endpoints.
- `/home/runner/work/Leetcode/Leetcode/fluxbot-ai/frontend/app/dashboard/page.tsx`: Next.js App Router dashboard entry.
- `/home/runner/work/Leetcode/Leetcode/fluxbot-ai/frontend/components/dashboard/FluxbotDashboard.tsx`: Core high-density finance dashboard UI.

## Core Backend Routes

- `POST /reconciliation/run`: Matches bank transactions to ERP invoices.
- `POST /reconciliation/anomalies`: Flags duplicate payments, outlier spend, and unknown merchant codes.
- `GET /month-close/readiness`: Returns close readiness score and progress pipeline state.
- `POST /month-close/execute`: CFO/Controller-only one-click close execution.
- `GET /cash-flow/forecast`: Returns historical and 90-day projected cash-flow metrics.
- `GET /audit/adjustments`: Returns immutable adjustment feed metadata.

## Integration Placeholders

- Banking ingestion aligns to Plaid transaction payloads.
- Billing reconciliation aligns to Stripe settlement payloads.
- ERP adapters reserved for NetSuite/QuickBooks REST connectors.

## Security Notes

- RBAC enforced in backend via role-based guards (`ACCOUNTANT`, `CFO_CONTROLLER`).
- Strict request payload validation is enabled globally.
- Immutable audit table blocks update/delete operations at DB layer for SOX defensibility.
- Double-entry constraints applied to ledger rows.

## Run Notes

Backend and frontend `package.json` files are included for setup with your standard Node package manager.
