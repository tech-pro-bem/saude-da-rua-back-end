import { S3, AWSError } from 'aws-sdk';
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import { File } from '../../../entities/File';
import { InternalServerError } from '../../../helpers/errors';
import { IUploadFileRepository } from '../../interfaces';

export class UploadFileToS3Repository implements IUploadFileRepository {
    // Saber se o arquivo é repetido no s3
    private s3Connection: S3;

    constructor() {
        this.s3Connection = new S3();
    }

    public async uploadFile(file: File, data: Buffer): Promise<void | Error> {
        const fileParams: PutObjectRequest = {
            Body: data,
            Key: file.fileId,
            ContentType: file.fileType,
            Bucket: process.env.FILE_BUCKET_NAME,
            ACL: 'public-read',
        };

        const fileIdReturnedFromS3: PutObjectOutput | AWSError =
            await this.s3Connection.putObject(fileParams).promise();

        if (fileIdReturnedFromS3 instanceof Error) {
            throw new InternalServerError();
        }
    }
}

// private url = `https://${process.env.FILE_BUCKET_NAME}.s3-${process.env.region}.amazon.com/`;
