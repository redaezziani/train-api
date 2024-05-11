/*
  Warnings:

  - Added the required column `userId` to the `resetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resetPassword" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "verifyEmail" (
    "id" VARCHAR(36) NOT NULL,
    "email" TEXT NOT NULL,
    "token" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "verifyEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verifyEmail_email_key" ON "verifyEmail"("email");

-- AddForeignKey
ALTER TABLE "resetPassword" ADD CONSTRAINT "resetPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifyEmail" ADD CONSTRAINT "verifyEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
