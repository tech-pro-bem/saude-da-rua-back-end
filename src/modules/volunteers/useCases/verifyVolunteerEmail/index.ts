import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import VerifyVolunteerEmailUseCase from './VerifyVolunteerEmailUseCase';

const volunteersRepository = new PrismaVolunteersRepository();

const verifyVolunteerEmailUseCase = new VerifyVolunteerEmailUseCase(
    volunteersRepository
);

export { verifyVolunteerEmailUseCase };
