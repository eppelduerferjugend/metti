/*
  Warnings:

  - The values [Pending,Completed,Canceled] on the enum `OrderState` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `deliverable` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payable` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('payconiq', 'sumup');

-- CreateEnum
CREATE TYPE "PaymentState" AS ENUM ('pending', 'canceled', 'completed');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderState_new" AS ENUM ('pending', 'canceled', 'completed');
ALTER TABLE "Order" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "state" TYPE "OrderState_new" USING ("state"::text::"OrderState_new");
ALTER TYPE "OrderState" RENAME TO "OrderState_old";
ALTER TYPE "OrderState_new" RENAME TO "OrderState";
DROP TYPE "OrderState_old";
ALTER TABLE "Order" ALTER COLUMN "state" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tableId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" INTEGER,
ALTER COLUMN "state" SET DEFAULT 'pending',
ALTER COLUMN "tableId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "deliverable" BOOLEAN NOT NULL,
ADD COLUMN     "payable" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "state" "PaymentState" NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "providerId" VARCHAR(255) NOT NULL,
    "orderId" INTEGER NOT NULL,
    "amountPayable" INTEGER NOT NULL,
    "amountPayed" INTEGER,
    "message" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_provider_providerId_key" ON "Payment"("provider", "providerId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
