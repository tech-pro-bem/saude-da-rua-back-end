import { FileDynamoRepository } from '../../repositories/implementations/DynamoDB';
import { DeleFileUseCase } from './DeleteFileUseCase';

const deleteFileDynamoRepository = new FileDynamoRepository();

const deleteFileUseCase = new DeleFileUseCase(deleteFileDynamoRepository);

export default deleteFileUseCase;
