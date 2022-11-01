import { PrismaVolunteersRepository } from '../../repositories/implementations/prisma/PrismaVolunteersRepository';
import GetVolunteersUseCase from './GetVolunteersUseCase';

const volunteersRepository = new PrismaVolunteersRepository();

const getVolunteersUseCase = new GetVolunteersUseCase(volunteersRepository);

export { getVolunteersUseCase };
