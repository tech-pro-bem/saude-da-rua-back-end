import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";
import GetAdminsUseCase from './GetAdminsUseCase';

const adminRepository = new PrismaAdminsRepository();

const getAdminsUseCase = new GetAdminsUseCase(adminRepository);

export { getAdminsUseCase };
