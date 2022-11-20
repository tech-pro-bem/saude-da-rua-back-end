import { UpdateAdminPermissionLevelUseCase } from "./updateAdminPermissionLevelUseCase";
import { PrismaAdminsRepository } from "../../repositories/implementations/prisma/PrismaAdminsRepository";

const adminsRepository = new PrismaAdminsRepository();

const updateAdminPermissionLevelUseCase = new UpdateAdminPermissionLevelUseCase(adminsRepository);

export { updateAdminPermissionLevelUseCase };
