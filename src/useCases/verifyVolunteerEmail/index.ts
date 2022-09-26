import { VerifyVolunteerEmailPrismaRepository } from '../../repositories/implementations/Prisma/VerifyVolunteerEmailPrismaRepository';
import VerifyVolunteerEmailUseCase from './VerifyVolunteerEmailUseCase';

const verifyVolunteerEmailPrismaRepository =
    new VerifyVolunteerEmailPrismaRepository();

const verifyVolunteerEmailUseCase = new VerifyVolunteerEmailUseCase(
    verifyVolunteerEmailPrismaRepository
);

export default verifyVolunteerEmailUseCase;
