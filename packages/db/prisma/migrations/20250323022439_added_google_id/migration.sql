/*
  Warnings:

  - You are about to drop the column `auth_type` on the `User` table. All the data in the column will be lost.
  - Added the required column `googleId` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Made the column `githubId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `googleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_githubId_key";

-- DropIndex
DROP INDEX "User_googleId_key";

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "googleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth_type",
ALTER COLUMN "githubId" SET NOT NULL,
ALTER COLUMN "googleId" SET NOT NULL;
