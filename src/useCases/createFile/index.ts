import { UploadFileToS3Repository } from '../../repositories/implementations/S3';
import { SaveFileUrlDynamoRepository } from '../../repositories/implementations/DynamoDB';
import UploadFileUseCase from './CreateFileUseCase';

const uploadFileToS3Repository = new UploadFileToS3Repository();

const saveFileUrlDynamoRepository = new SaveFileUrlDynamoRepository();

const uploadFileUseCase = new UploadFileUseCase(
    uploadFileToS3Repository,
    saveFileUrlDynamoRepository
);

export default uploadFileUseCase;
