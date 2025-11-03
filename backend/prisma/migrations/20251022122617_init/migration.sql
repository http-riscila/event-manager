/*
  Warnings:

  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SignUp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttendeeType" AS ENUM ('ADMIN', 'ATTENDEE');

-- DropIndex
DROP INDEX "public"."User_userName_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SignUp" ADD COLUMN     "type" "AttendeeType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
DROP COLUMN "userName",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."UserType";

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
