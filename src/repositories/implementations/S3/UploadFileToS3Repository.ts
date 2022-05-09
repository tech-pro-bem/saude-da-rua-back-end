import { S3, AWSError } from 'aws-sdk';
import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import { FileType } from '../../../entities/File';
import { InternalServerError } from '../../../helpers/errors';
import { IUploadFileRepository } from '../../interfaces';

export class UploadFileToS3Repository implements IUploadFileRepository {
    // Saber se o arquivo é repetido no s3
    private s3Connection: S3;

    private fileUrl: string;

    private baseUrl = `https://${process.env.FILE_BUCKET_NAME}.s3-${process.env.region}.amazon.com/`;

    constructor() {
        this.s3Connection = new S3();
    }

    public async uploadFile(fileId: string, fileType: FileType, data: Buffer): Promise<string | InternalServerError> {
        const fileParams: PutObjectRequest = {
            Body: data,
            Key: fileId,
            ContentType: fileType,
            Bucket: process.env.FILE_BUCKET_NAME,
            ACL: 'public-read',
        };

        const outputFromS3: PutObjectOutput | AWSError =
            await this.s3Connection.putObject(fileParams).promise();

        if (outputFromS3 instanceof Error) {
            throw new InternalServerError('There was an error trying to save the file to our file bank');
        }

        this.fileUrl = this.baseUrl + fileId;

        return this.fileUrl;
    }
}
