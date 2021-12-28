/*
  Warnings:

  - You are about to alter the column `status` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Client_status")`.

*/
-- AlterTable
ALTER TABLE `Client` MODIFY `status` ENUM('APPROVED', 'REJECTED') NOT NULL;
