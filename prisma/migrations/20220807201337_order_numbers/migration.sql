/*
  Warnings:

  - You are about to alter the column `number` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numberPrefix]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numberPrefix` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "number" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "numberPrefix" VARCHAR(255) NOT NULL,
ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Store_slug_key" ON "Store"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Store_numberPrefix_key" ON "Store"("numberPrefix");

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
