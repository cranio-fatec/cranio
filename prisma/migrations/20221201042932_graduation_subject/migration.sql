/*
  Warnings:

  - You are about to drop the column `graduations` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GraduationLevel" AS ENUM ('TECNOLOGO', 'BACHARELADO', 'LICENSIATURA', 'POS_GRADUACAO', 'MESTRADO', 'DOUTORADO', 'POS_DOUTORADO');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "graduations",
ALTER COLUMN "username" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "graduationId" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGraduation" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "level" "GraduationLevel" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserGraduation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_graduationId_fkey" FOREIGN KEY ("graduationId") REFERENCES "UserGraduation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGraduation" ADD CONSTRAINT "UserGraduation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
