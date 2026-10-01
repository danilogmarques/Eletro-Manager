CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL CHECK (status IN ('Active', 'Inactive', 'Pending')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  base_price numeric(12, 2) NOT NULL CHECK (base_price >= 0),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id),
  service_id uuid NOT NULL REFERENCES services(id),
  price numeric(12, 2) NOT NULL CHECK (price >= 0),
  status text NOT NULL CHECK (status IN ('approved', 'pending')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monthly_analytics (
  month date PRIMARY KEY,
  accesses integer NOT NULL DEFAULT 0 CHECK (accesses >= 0),
  conversions integer NOT NULL DEFAULT 0 CHECK (conversions >= 0)
);