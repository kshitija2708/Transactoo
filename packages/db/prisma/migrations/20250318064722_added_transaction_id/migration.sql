/*
  Warnings:

  - Made the column `transactionId` on table `TransferP2P` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TransferP2P" ALTER COLUMN "transactionId" SET NOT NULL;
