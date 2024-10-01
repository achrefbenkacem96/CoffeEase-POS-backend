-- DropForeignKey
ALTER TABLE "StockReport" DROP CONSTRAINT "StockReport_productId_fkey";

-- AddForeignKey
ALTER TABLE "StockReport" ADD CONSTRAINT "StockReport_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
