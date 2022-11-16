import { PrismaInstagramTokensRepository } from '../../repositories/implementations/prisma/PrismaInstagramTokensRepository';
import { GetInstagramTokenUseCase } from './GetInstagramTokenUseCase';

const prismaInstagramTokensRepository = new PrismaInstagramTokensRepository();
const getInstagramTokenUseCase = new GetInstagramTokenUseCase(
    prismaInstagramTokensRepository
);

export { getInstagramTokenUseCase };
