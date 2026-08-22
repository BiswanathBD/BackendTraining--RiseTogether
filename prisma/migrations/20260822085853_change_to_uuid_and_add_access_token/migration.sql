/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Countries" (
    "countryId" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("countryId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "countryId" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "accessToken" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("countryId") ON DELETE SET NULL ON UPDATE CASCADE;
