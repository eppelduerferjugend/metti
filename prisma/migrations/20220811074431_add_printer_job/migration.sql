-- CreateEnum
CREATE TYPE "PrinterJobState" AS ENUM ('pending', 'completed');

-- CreateTable
CREATE TABLE "PrinterJob" (
    "id" SERIAL NOT NULL,
    "state" "PrinterJobState" NOT NULL,
    "printer" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "orderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrinterJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrinterJob" ADD CONSTRAINT "PrinterJob_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
