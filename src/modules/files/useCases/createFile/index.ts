import { PrismaFilesRepository } from "../../repositories/implementations/prisma/PrismaFilesRepository";
import { UploadFileUseCase } from "./CreateFileUseCase";

const filesRepository = new PrismaFilesRepository();

const createFileUseCase = new UploadFileUseCase(filesRepository);

export { createFileUseCase };
