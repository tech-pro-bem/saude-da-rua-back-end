import { LoginAdminPrismaRepository } from '../../repositories/implementations/Prisma/LoginAdminPrismaRepository';
import LoginAdminUseCase from './LoginAdminUseCase';

const loginAdminPrismaRepository = new LoginAdminPrismaRepository();

const loginAdminUseCase = new LoginAdminUseCase(loginAdminPrismaRepository);

export default loginAdminUseCase;
