-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "accessToken" TEXT NOT NULL,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "associated_user_scope" TEXT,
    "associated_user_id" BIGINT,
    "associated_user_first_name" TEXT,
    "associated_user_last_name" TEXT,
    "associated_user_email" TEXT,
    "associated_user_locale" TEXT,
    "associated_user_email_verified" BOOLEAN,
    "associated_user_account_owner" BOOLEAN,
    "associated_user_collaborator" BOOLEAN,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_shopId_key" ON "Settings"("shopId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

