import { PrismaPixRepository } from "../../repositories/implementations/prisma/PrismaPixRepository";
import { UpdatePixUseCase } from "./UpdatePixKeyUseCase";

const prismaRepository = new PrismaPixRepository();

const updatePixKeyUseCase = new UpdatePixUseCase(prismaRepository);

export { updatePixKeyUseCase };
