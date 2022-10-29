import { LoginAdminUseCase } from "./LoginAdminUseCase";
import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";

const adminsRepository = new PrismaAdminsRepository();

const loginAdminUseCase = new LoginAdminUseCase(adminsRepository);

export { loginAdminUseCase };
