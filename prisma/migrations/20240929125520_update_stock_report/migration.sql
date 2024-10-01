/*
  Warnings:

  - Added the required column `movement` to the `StockReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StockReport" DROP CONSTRAINT "StockReport_productId_fkey";

-- AlterTable
ALTER TABLE "StockReport" ADD COLUMN     "movement" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StockReport" ADD CONSTRAINT "StockReport_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
