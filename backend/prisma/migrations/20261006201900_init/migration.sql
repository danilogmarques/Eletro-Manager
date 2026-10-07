CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "customers_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "customers_status_check" CHECK ("status" IN ('Active', 'Inactive', 'Pending'))
);

CREATE TABLE "services" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "base_price" DECIMAL(12,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "services_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "services_base_price_check" CHECK ("base_price" >= 0)
);

CREATE TABLE "budgets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "budgets_price_check" CHECK ("price" >= 0),
    CONSTRAINT "budgets_status_check" CHECK ("status" IN ('approved', 'pending'))
);

CREATE TABLE "monthly_analytics" (
    "month" DATE NOT NULL,
    "accesses" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "monthly_analytics_pkey" PRIMARY KEY ("month"),
    CONSTRAINT "monthly_analytics_accesses_check" CHECK ("accesses" >= 0),
    CONSTRAINT "monthly_analytics_conversions_check" CHECK ("conversions" >= 0)
);

ALTER TABLE "budgets"
    ADD CONSTRAINT "budgets_customer_id_fkey"
    FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "budgets"
    ADD CONSTRAINT "budgets_service_id_fkey"
    FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
