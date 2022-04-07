import { FileDynamoRepository } from '../../repositories/implementations/DynamoDB';
import { UploadFileUseCase } from './CreateFileUseCase';

const createFileDynamoRepository = new FileDynamoRepository();

const createFileUseCase = new UploadFileUseCase(createFileDynamoRepository);

export default createFileUseCase;
