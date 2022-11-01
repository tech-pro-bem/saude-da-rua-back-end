import { ListFilesUseCase } from "./ListFilesUseCase";
import { PrismaFilesRepository } from "../../repositories/implementations/prisma/PrismaFilesRepository";

const filesRepository = new PrismaFilesRepository();

const listFilesUseCase = new ListFilesUseCase(filesRepository);

export { listFilesUseCase };
