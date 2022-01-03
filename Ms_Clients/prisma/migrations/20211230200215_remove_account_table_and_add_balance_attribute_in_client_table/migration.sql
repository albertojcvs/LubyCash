/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_client_id_fkey`;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `balance` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Account`;
