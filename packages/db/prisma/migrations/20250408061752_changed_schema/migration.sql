/*
  Warnings:

  - You are about to drop the column `merchantId` on the `Balance` table. All the data in the column will be lost.
  - Made the column `userId` on table `Balance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropIndex
DROP INDEX "Balance_userId_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "merchantId",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TransferP2P" ALTER COLUMN "timestamp" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
