/*
  Warnings:

  - You are about to drop the `pixs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pixs";

-- CreateTable
CREATE TABLE "pix" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "pix_pkey" PRIMARY KEY ("id")
);
