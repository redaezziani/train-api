-- CreateTable
CREATE TABLE "resetPassword" (
    "id" VARCHAR(36) NOT NULL,
    "email" TEXT NOT NULL,
    "token" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPassword_email_key" ON "resetPassword"("email");
