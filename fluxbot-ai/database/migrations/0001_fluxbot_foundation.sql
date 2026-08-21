BEGIN;

CREATE TYPE role_type AS ENUM ('ACCOUNTANT', 'CFO_CONTROLLER');
CREATE TYPE reconciliation_status AS ENUM ('MATCHED', 'UNMATCHED', 'REVIEW_REQUIRED');
CREATE TYPE anomaly_type AS ENUM ('DUPLICATE_PAYMENT', 'OUT_OF_BOUNDARY_EXPENSE', 'UNRECOGNIZED_MERCHANT_CODE');
CREATE TYPE close_step_status AS ENUM ('READY', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED');

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role role_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ledger_entries (
  id BIGSERIAL PRIMARY KEY,
  journal_batch_id UUID NOT NULL,
  entry_date DATE NOT NULL,
  account_code TEXT NOT NULL,
  debit NUMERIC(18,2) NOT NULL DEFAULT 0,
  credit NUMERIC(18,2) NOT NULL DEFAULT 0,
  source_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_double_entry_non_negative CHECK (debit >= 0 AND credit >= 0),
  CONSTRAINT chk_double_entry_single_side CHECK ((debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0))
);

CREATE TABLE bank_transactions (
  id BIGSERIAL PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  institution_name TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  merchant_code TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  booked_at TIMESTAMPTZ NOT NULL,
  raw_payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE erp_invoices (
  id BIGSERIAL PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  vendor_name TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  invoice_date DATE NOT NULL,
  raw_payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reconciliation_runs (
  id BIGSERIAL PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  initiated_by UUID REFERENCES users(id),
  summary JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE reconciliation_matches (
  id BIGSERIAL PRIMARY KEY,
  run_id BIGINT NOT NULL REFERENCES reconciliation_runs(id) ON DELETE CASCADE,
  bank_transaction_id BIGINT NOT NULL REFERENCES bank_transactions(id),
  erp_invoice_id BIGINT REFERENCES erp_invoices(id),
  status reconciliation_status NOT NULL,
  confidence NUMERIC(5,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE anomaly_flags (
  id BIGSERIAL PRIMARY KEY,
  run_id BIGINT NOT NULL REFERENCES reconciliation_runs(id) ON DELETE CASCADE,
  bank_transaction_id BIGINT NOT NULL REFERENCES bank_transactions(id),
  anomaly anomaly_type NOT NULL,
  detail TEXT NOT NULL,
  ai_confidence NUMERIC(5,4) NOT NULL,
  flagged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE month_close_runs (
  id BIGSERIAL PRIMARY KEY,
  period_month DATE NOT NULL,
  readiness_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  initiated_by UUID REFERENCES users(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_report JSONB NOT NULL DEFAULT '[]'::JSONB
);

CREATE TABLE month_close_steps (
  id BIGSERIAL PRIMARY KEY,
  month_close_run_id BIGINT NOT NULL REFERENCES month_close_runs(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  status close_step_status NOT NULL,
  completion_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cash_flow_snapshots (
  id BIGSERIAL PRIMARY KEY,
  snapshot_date DATE NOT NULL,
  historical_cash NUMERIC(18,2) NOT NULL,
  forecast_cash NUMERIC(18,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE immutable_audit_log (
  id BIGSERIAL PRIMARY KEY,
  event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source_entity TEXT NOT NULL,
  source_entity_id TEXT NOT NULL,
  ai_confidence_level NUMERIC(5,4) NOT NULL,
  action_taken TEXT NOT NULL,
  system_override BOOLEAN NOT NULL DEFAULT FALSE,
  approving_user_id UUID REFERENCES users(id),
  payload JSONB NOT NULL,
  checksum_sha256 TEXT NOT NULL
);

REVOKE INSERT, UPDATE, DELETE ON immutable_audit_log FROM PUBLIC;

CREATE OR REPLACE FUNCTION block_immutable_audit_log_mutations()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'immutable_audit_log is append-only';
END;
$$;

CREATE TRIGGER trg_block_immutable_audit_log_updates
BEFORE UPDATE OR DELETE ON immutable_audit_log
FOR EACH ROW EXECUTE FUNCTION block_immutable_audit_log_mutations();

COMMIT;
