import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";
import { GetAuthenticatedAdminUseCase } from "./GetAuthenticatedAdminUseCase";

const adminsRepository = new PrismaAdminsRepository();

const getAuthenticatedAdminUseCase = new GetAuthenticatedAdminUseCase(
    adminsRepository
);

export { getAuthenticatedAdminUseCase };
