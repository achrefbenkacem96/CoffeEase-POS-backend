/*
  Warnings:

  - You are about to drop the column `totalOrders` on the `SalesReport` table. All the data in the column will be lost.
  - You are about to drop the column `totalSales` on the `SalesReport` table. All the data in the column will be lost.
  - Added the required column `productId` to the `SalesReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantitySold` to the `SalesReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRevenue` to the `SalesReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesReport" DROP COLUMN "totalOrders",
DROP COLUMN "totalSales",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "quantitySold" INTEGER NOT NULL,
ADD COLUMN     "totalRevenue" DOUBLE PRECISION NOT NULL;
