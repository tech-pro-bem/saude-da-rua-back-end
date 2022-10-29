import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

const adminsRepository = new PrismaAdminsRepository();

const createAdminUseCase = new CreateAdminUseCase(adminsRepository);

export { createAdminUseCase };
