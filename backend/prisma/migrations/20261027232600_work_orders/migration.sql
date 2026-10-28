CREATE TABLE "work_orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "scheduled_at" TIMESTAMPTZ(6) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendada',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "work_orders_status_check" CHECK ("status" IN ('Agendada', 'Em andamento', 'Concluída'))
);

CREATE INDEX "work_orders_customer_id_idx" ON "work_orders"("customer_id");
CREATE INDEX "work_orders_service_id_idx" ON "work_orders"("service_id");
CREATE INDEX "work_orders_scheduled_at_idx" ON "work_orders"("scheduled_at");

ALTER TABLE "work_orders"
    ADD CONSTRAINT "work_orders_customer_id_fkey"
    FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "work_orders"
    ADD CONSTRAINT "work_orders_service_id_fkey"
    FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
