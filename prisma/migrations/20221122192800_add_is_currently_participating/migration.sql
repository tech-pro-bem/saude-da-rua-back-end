/*
  Warnings:

  - Added the required column `isCurrentlyParticipating` to the `volunteers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "volunteers" ADD COLUMN     "isCurrentlyParticipating" BOOLEAN NOT NULL;
