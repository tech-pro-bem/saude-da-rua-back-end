import { IDeleteFileRepository } from '../../repositories/interfaces';
import { DeleteFileDTO } from './DeleteFileDTO';
import { S3 } from 'aws-sdk';

const s3 = new S3();

export class DeleFileUseCase {
  constructor(private deleteFileRepo: IDeleteFileRepository) {}

  public async execute(params: DeleteFileDTO.Params): Promise<void> {
    await s3.deleteObject({
        Bucket: process.env.imageUploadBucket,
        Key: params.fileId,
    }).promise()
    await this.deleteFileRepo.deleteFile(params.fileId);
  }
}
