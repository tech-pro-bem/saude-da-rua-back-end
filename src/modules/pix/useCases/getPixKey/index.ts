import { PrismaPixRepository } from '../../repositories/implementations/prisma/PrismaPixRepository';
import { GetPixKeyUseCase } from './GetPixKeyUseCase';

const prismaPixRepository = new PrismaPixRepository();
const getPixKeyUseCase = new GetPixKeyUseCase(
    prismaPixRepository
);

export { getPixKeyUseCase };
