/*
  Warnings:

  - The `semester` column on the `volunteers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `listFreeDaysOfWeek` column on the `volunteers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `occupation` on the `volunteers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `howMuchParticipate` on the `volunteers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `howDidKnowOfSDR` on the `volunteers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('MEDICO', 'ENFERMEIRO', 'FARMACEUTICO', 'ESTUDANTE');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH', 'NINTH', 'TENTH', 'MORE');

-- CreateEnum
CREATE TYPE "FreeDaysOfWeek" AS ENUM ('DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO');

-- CreateEnum
CREATE TYPE "HowMuchParticipate" AS ENUM ('NOT_PARTICIPATED', 'ONE_PARTICIPATION', 'BETWEEN_TWO_AND_FIVE_PARTICIPATION', 'MORE_THAN_FIVE_PARTICIPATION');

-- CreateEnum
CREATE TYPE "HowDidKnowOfSDR" AS ENUM ('SITE', 'INSTAGRAM', 'POSTS', 'EDUCATIONAL_INSTITUTIONS', 'OTHER');

-- AlterTable
ALTER TABLE "volunteers" DROP COLUMN "occupation",
ADD COLUMN     "occupation" "Occupation" NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" "Semester",
DROP COLUMN "listFreeDaysOfWeek",
ADD COLUMN     "listFreeDaysOfWeek" "FreeDaysOfWeek"[],
DROP COLUMN "howMuchParticipate",
ADD COLUMN     "howMuchParticipate" "HowMuchParticipate" NOT NULL,
DROP COLUMN "howDidKnowOfSDR",
ADD COLUMN     "howDidKnowOfSDR" "HowDidKnowOfSDR" NOT NULL;

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);
