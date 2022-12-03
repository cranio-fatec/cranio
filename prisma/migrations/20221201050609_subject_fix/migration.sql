/*
  Warnings:

  - You are about to drop the column `graduationId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `UserGraduation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_graduationId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "graduationId";

-- AlterTable
ALTER TABLE "UserGraduation" ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserGraduation" ADD CONSTRAINT "UserGraduation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
