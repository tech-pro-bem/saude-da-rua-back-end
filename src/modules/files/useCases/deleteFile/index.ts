import { DeleFileUseCase } from "./DeleteFileUseCase";
import { PrismaFilesRepository } from "../../repositories/implementations/prisma/PrismaFilesRepository";

const filesRepository = new PrismaFilesRepository();

const deleteFileUseCase = new DeleFileUseCase(filesRepository);

export { deleteFileUseCase };
