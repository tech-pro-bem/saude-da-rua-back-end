import GetAuthenticatedAdminUseCase from './GetAuthenticatedAdminUseCase';
import { LoginAdminPrismaRepository } from '../../repositories/implementations/Prisma/LoginAdminPrismaRepository';

const loginAdminPrismaRepository = new LoginAdminPrismaRepository();

const getAuthenticatedAdminUseCase = new GetAuthenticatedAdminUseCase(
    loginAdminPrismaRepository
);

export default getAuthenticatedAdminUseCase;
