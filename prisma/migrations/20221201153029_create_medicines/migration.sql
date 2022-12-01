-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cellPhoneWithDDD" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "milligrams" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "pharmaceuticalForm" TEXT NOT NULL,
    "wasRead" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);
