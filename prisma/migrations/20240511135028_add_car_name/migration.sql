/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CarName" AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "name" "CarName" NOT NULL DEFAULT 'A';

-- CreateIndex
CREATE UNIQUE INDEX "Car_name_key" ON "Car"("name");
