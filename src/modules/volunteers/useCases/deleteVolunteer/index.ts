import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import { DeleteVolunteerUseCase } from './DeleteVolunteerUseCase';

const prismaVolunteersRepository = new PrismaVolunteersRepository();

const deleteVolunteerUseCase = new DeleteVolunteerUseCase(
    prismaVolunteersRepository
);

export { deleteVolunteerUseCase };
