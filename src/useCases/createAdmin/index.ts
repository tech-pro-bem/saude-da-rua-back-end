import { CreateAdminPrismaRepository } from '../../repositories/implementations/Prisma/CreateAdminPrismaRepository';
import CreateAdminUseCase from './CreateAdminUseCase';

const createAdminPrismaRepository = new CreateAdminPrismaRepository();

const createAdminUseCase = new CreateAdminUseCase(createAdminPrismaRepository);

export default createAdminUseCase;
