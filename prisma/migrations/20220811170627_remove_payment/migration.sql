/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliverable` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `payable` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "PrinterJob" ALTER COLUMN "state" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "deliverable",
DROP COLUMN "payable",
ADD COLUMN     "newOrderReceiptPrinter" TEXT;

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "PaymentProvider";

-- DropEnum
DROP TYPE "PaymentState";
