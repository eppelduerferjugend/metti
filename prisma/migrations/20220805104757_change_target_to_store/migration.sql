/*
  Warnings:

  - The primary key for the `LineItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `targetId` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the `OrderTarget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderTargetToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_targetId_fkey";

-- DropForeignKey
ALTER TABLE "_OrderTargetToProduct" DROP CONSTRAINT "_OrderTargetToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderTargetToProduct" DROP CONSTRAINT "_OrderTargetToProduct_B_fkey";

-- AlterTable
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_pkey",
DROP COLUMN "targetId",
ADD CONSTRAINT "LineItem_pkey" PRIMARY KEY ("orderId", "productId");

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "storeId" INTEGER NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "OrderTarget";

-- DropTable
DROP TABLE "_OrderTargetToProduct";

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
