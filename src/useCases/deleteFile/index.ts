import { DeleteFileToS3Repository } from '../../repositories/implementations/S3'; 
import { DeleteFileInfoDynamoRepository } from '../../repositories/implementations/DynamoDB';
import DeleFileUseCase from './DeleteFileUseCase';

const deleteFileRepository = new DeleteFileToS3Repository();

const deleteFileDynamoRepository = new DeleteFileInfoDynamoRepository();

const deleteFileUseCase = new DeleFileUseCase(deleteFileRepository, deleteFileDynamoRepository);

export default deleteFileUseCase;
