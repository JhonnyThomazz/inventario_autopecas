/*
  Warnings:

  - You are about to drop the column `marca` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Produto_nome_key` ON `produto`;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `marca`,
    DROP COLUMN `modelo`,
    DROP COLUMN `nome`,
    ADD COLUMN `codigo` VARCHAR(50) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(255) NOT NULL,
    ADD COLUMN `valorUnitario` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Produto_codigo_key` ON `Produto`(`codigo`);
