/*
  Warnings:

  - You are about to drop the column `shop` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Settings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `shopId` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Settings_shop_key";

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "shop",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL,
ADD CONSTRAINT "Settings_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_shopId_key" ON "Settings"("shopId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
