-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType";
