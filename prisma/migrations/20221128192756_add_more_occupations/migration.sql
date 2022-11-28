-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Occupation" ADD VALUE 'TECNICO_DE_ENFERMAGEM';
ALTER TYPE "Occupation" ADD VALUE 'PSICOLOGO';
ALTER TYPE "Occupation" ADD VALUE 'NUTRICIONISTA';
ALTER TYPE "Occupation" ADD VALUE 'ASSISTENTE_SOCIAL';
ALTER TYPE "Occupation" ADD VALUE 'DENTISTA';
ALTER TYPE "Occupation" ADD VALUE 'VETERINARIO';
