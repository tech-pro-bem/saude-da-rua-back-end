import { GetOneVolunteerPrismaRepository } from '../../repositories/implementations/Prisma/GetOneVolunteerPrismaRepository';
import GetOneVolunteerUseCase from './GetOneVolunteerUseCase';

const getOneVolunteerPrismaRepository = new GetOneVolunteerPrismaRepository();

const getVolunteersUseCase = new GetOneVolunteerUseCase(
    getOneVolunteerPrismaRepository
);

export default getVolunteersUseCase;
