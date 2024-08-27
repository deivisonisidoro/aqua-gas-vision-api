-- CreateTable
CREATE TABLE "measure" (
    "measure_uuid" UUID NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("measure_uuid")
);
