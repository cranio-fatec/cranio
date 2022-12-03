-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteSubjectId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteSubjectId_fkey" FOREIGN KEY ("favoriteSubjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
