-- CreateTable
CREATE TABLE "Settings" (
    "shop" TEXT NOT NULL,
    "settings" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_shop_key" ON "Settings"("shop");

