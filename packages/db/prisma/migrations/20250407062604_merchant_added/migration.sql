-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "merchantId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TransferP2P" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
