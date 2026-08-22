/*
  Warnings:

  - A unique constraint covering the columns `[countryName]` on the table `Countries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Countries_countryName_key" ON "Countries"("countryName");
