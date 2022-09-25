import { FilePrismaRepository } from '../../repositories/implementations/Prisma/FilePrismaRepository';
import { DeleFileUseCase } from './DeleteFileUseCase';

const filePrismaRepository = new FilePrismaRepository();

const deleteFileUseCase = new DeleFileUseCase(filePrismaRepository);

export default deleteFileUseCase;
