import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import GetOneVolunteerUseCase from './GetOneVolunteerUseCase';

const volunteersRepository = new PrismaVolunteersRepository();

const getOneVolunteerUseCase = new GetOneVolunteerUseCase(volunteersRepository);

export { getOneVolunteerUseCase };
