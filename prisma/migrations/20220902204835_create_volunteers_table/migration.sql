-- CreateTable
CREATE TABLE "volunteers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "cellphoneNumberWithDDD" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "semester" TEXT,
    "listFreeDaysOfWeek" TEXT[],
    "numberOfFreeDaysOfWeek" INTEGER NOT NULL,
    "howMuchParticipate" TEXT NOT NULL,
    "howDidKnowOfSDR" TEXT NOT NULL,
    "verifiedEmail" BOOLEAN NOT NULL,
    "timeOfExperience" TEXT NOT NULL,
    "speciality" TEXT,
    "university" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);
