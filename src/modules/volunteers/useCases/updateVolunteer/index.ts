import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import { UpdateVolunteerUseCase } from './UpdateVolunteerUseCase';

const prismaVolunteersRepository = new PrismaVolunteersRepository();

export const updateVolunteerUseCase = new UpdateVolunteerUseCase(
    prismaVolunteersRepository
);
