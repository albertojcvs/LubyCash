/*
  Warnings:

  - You are about to drop the column `adress` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `client_from_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `client_to_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from_client_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_client_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_client_from_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_client_to_id_fkey`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `client_from_id`,
    DROP COLUMN `client_to_id`,
    ADD COLUMN `from_client_id` INTEGER NOT NULL,
    ADD COLUMN `to_client_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_from_client_id_fkey` FOREIGN KEY (`from_client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_to_client_id_fkey` FOREIGN KEY (`to_client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
