import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import { UpdateCurrentlyParticipationUseCase } from './UpdateCurrentlyParticipationUseCase';

const prismaVolunteersRepository = new PrismaVolunteersRepository();

export const updateCurrentlyParticipationUseCase =
    new UpdateCurrentlyParticipationUseCase(prismaVolunteersRepository);
