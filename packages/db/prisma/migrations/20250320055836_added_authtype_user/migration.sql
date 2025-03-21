/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OnRampTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TransferP2P` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransferP2P" DROP CONSTRAINT "TransferP2P_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "TransferP2P" DROP CONSTRAINT "TransferP2P_toUserId_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "userId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "userId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TransferP2P" DROP CONSTRAINT "TransferP2P_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "fromUserId" SET DATA TYPE BIGINT,
ALTER COLUMN "toUserId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "TransferP2P_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferP2P" ADD CONSTRAINT "TransferP2P_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferP2P" ADD CONSTRAINT "TransferP2P_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
