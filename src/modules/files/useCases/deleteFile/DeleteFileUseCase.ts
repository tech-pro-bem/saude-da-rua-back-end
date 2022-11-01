import { S3 } from 'aws-sdk';
import { IFilesRepository } from '../../repositories/IFilesRepository';
import { DeleteFileDTO } from './DeleteFileDTO';

const s3 = new S3();

export class DeleFileUseCase {
    constructor(private filesRepository: IFilesRepository) {}

    public async execute(params: DeleteFileDTO.Params): Promise<void> {
        await s3
            .deleteObject({
                Bucket: process.env.FILE_BUCKET_NAME,
                Key: params.fileId,
            })
            .promise();
        await this.filesRepository.deleteFile(params.fileId);
    }
}
