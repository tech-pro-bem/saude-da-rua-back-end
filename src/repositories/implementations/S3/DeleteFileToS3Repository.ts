import { IDeleteFileRepository } from "../../interfaces";
import { AWSError, S3 } from 'aws-sdk';
import { InternalServerError } from '../../../helpers/errors';
import { DeleteObjectRequest, DeleteObjectOutput } from 'aws-sdk/clients/s3';

export class DeleteFileToS3Repository implements IDeleteFileRepository {
    private readonly tableName = process.env.FILE_BUCKET_NAME;

    private s3Connection: S3;

    constructor() {
        this.s3Connection = new S3();
    }

    public async deleteFile(fileId: string): Promise<void | Error> {
        const deleteFileParams: DeleteObjectRequest = {
            Bucket: this.tableName,
            Key: fileId
        }

        const resultFromS3: DeleteObjectOutput | AWSError =
            await this.s3Connection.deleteObject(deleteFileParams).promise();

        if(resultFromS3 instanceof Error) {
            throw new InternalServerError('There was an error trying to delete the file in our file base');
        }
    }
}