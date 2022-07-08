import { UploadFileToS3Repository } from '../../repositories/implementations/S3';
import { SaveFileInfoDynamoRepository } from '../../repositories/implementations/DynamoDB';
import UploadFileUseCase from './CreateFileUseCase';

const uploadFileToS3Repository = new UploadFileToS3Repository();

const saveFileInfoDynamoRepository = new SaveFileInfoDynamoRepository();

const uploadFileUseCase = new UploadFileUseCase(
    uploadFileToS3Repository,
    saveFileInfoDynamoRepository
);

export default uploadFileUseCase;
