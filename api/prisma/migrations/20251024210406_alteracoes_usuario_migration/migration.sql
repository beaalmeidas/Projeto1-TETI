/*
  Warnings:

  - You are about to drop the column `nome` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `pacientes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `consultas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primeiroNome` to the `medicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ultimoSobrenome` to the `medicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `medicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `pacientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PACIENTE', 'ADMIN');

-- AlterTable
ALTER TABLE "consultas" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "medicos" DROP COLUMN "nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "primeiroNome" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "ultimoSobrenome" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "endereco",
DROP COLUMN "nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "primeiroNome" TEXT NOT NULL,
    "ultimoSobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PACIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_usuarioId_key" ON "pacientes"("usuarioId");

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
