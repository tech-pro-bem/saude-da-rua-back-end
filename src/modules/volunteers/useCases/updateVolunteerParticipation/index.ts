import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import { UpdateVolunteerParticipationUseCase } from './UpdateVolunteerParticipationUseCase';

const prismaVolunteersRepository = new PrismaVolunteersRepository();

export const updateVolunteerParticipationUseCase =
    new UpdateVolunteerParticipationUseCase(prismaVolunteersRepository);
