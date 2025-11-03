-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."SignUp" DROP CONSTRAINT "SignUp_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SignUp" DROP CONSTRAINT "SignUp_userId_fkey";

-- DropIndex
DROP INDEX "public"."User_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignUp" ADD CONSTRAINT "SignUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignUp" ADD CONSTRAINT "SignUp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
