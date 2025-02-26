/*
  Warnings:

  - You are about to drop the column `dispayName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `dispayName`,
    ADD COLUMN `displayName` VARCHAR(191) NULL;
