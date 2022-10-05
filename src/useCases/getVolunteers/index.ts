import { GetVolunteersPrismaRepository } from '../../repositories/implementations/Prisma/GetVolunteersPrismaRepository';
import GetVolunteersUseCase from './GetVolunteersUseCase';

const getVolunteersPrismaRepository = new GetVolunteersPrismaRepository();

const getVolunteersUseCase = new GetVolunteersUseCase(
    getVolunteersPrismaRepository
);

export default getVolunteersUseCase;
