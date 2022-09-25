import { FilePrismaRepository } from '../../repositories/implementations/Prisma/FilePrismaRepository';
import { ListFilesUseCase } from './ListFilesUseCase';

const filePrismaRepository = new FilePrismaRepository();

const listFilesUseCase = new ListFilesUseCase(filePrismaRepository);

export default listFilesUseCase;
