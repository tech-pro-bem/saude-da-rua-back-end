/*
  Warnings:

  - Added the required column `state` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicines" ADD COLUMN     "state" TEXT NOT NULL;
