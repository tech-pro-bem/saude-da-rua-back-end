import { DeleteAdminUseCase } from "./deleteAdminUseCase";
import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";

const adminsRepository = new PrismaAdminsRepository();

const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository);

export { deleteAdminUseCase };
