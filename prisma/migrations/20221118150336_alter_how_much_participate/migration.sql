--- AddParticipatedToOldEnum
BEGIN;
ALTER TYPE "HowMuchParticipate" ADD VALUE 'PARTICIPATED';
COMMIT;

-- AlterEnum
BEGIN;
UPDATE "volunteers" SET "howMuchParticipate" = 'PARTICIPATED' WHERE "howMuchParticipate" in ('ONE_PARTICIPATION', 'BETWEEN_TWO_AND_FIVE_PARTICIPATION', 'MORE_THAN_FIVE_PARTICIPATION');
CREATE TYPE "HowMuchParticipate_new" AS ENUM ('PARTICIPATED', 'NOT_PARTICIPATED');
ALTER TABLE "volunteers" ALTER COLUMN "howMuchParticipate" TYPE "HowMuchParticipate_new" USING ("howMuchParticipate"::text::"HowMuchParticipate_new");
ALTER TYPE "HowMuchParticipate" RENAME TO "HowMuchParticipate_old";
ALTER TYPE "HowMuchParticipate_new" RENAME TO "HowMuchParticipate";
DROP TYPE "HowMuchParticipate_old";
COMMIT;
