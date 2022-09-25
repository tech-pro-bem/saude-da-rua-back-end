import { FilePrismaRepository } from '../../repositories/implementations/Prisma/FilePrismaRepository';
import { UploadFileUseCase } from './CreateFileUseCase';

const filePrismaRepository = new FilePrismaRepository();

const createFileUseCase = new UploadFileUseCase(filePrismaRepository);

export default createFileUseCase;
