-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'PDF');

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "fileType" "FileType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
