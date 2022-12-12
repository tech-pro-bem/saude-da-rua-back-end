/*
  Warnings:

  - You are about to drop the column `state` on the `medicines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "state",
ALTER COLUMN "milligrams" SET DATA TYPE TEXT;
