import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { File } from '../../entities/File';
import { CreateFileDTO } from './CreateFileDTO';
import { ValidationError } from '../../../../helpers/errors';
import { IFilesRepository } from '../../repositories/IFilesRepository';

const s3 = new S3();
const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
];

export class UploadFileUseCase {
    constructor(private filesRepository: IFilesRepository) {}

    public async execute(params: CreateFileDTO.Params): Promise<File> {
        if (!allowedMimes.includes(params.fileMimeType)) {
            throw new ValidationError('Invalid mime type');
        }

        const buffer = Buffer.from(params.base64File, 'base64');
        const id = uuidv4();
        const url = `https://${process.env.FILE_BUCKET_NAME}.s3-${process.env.region}.amazonaws.com/${id}`;
        const file = new File({ id, fileType: params.fileType, url, name: params.name });

        await s3
            .putObject({
                Body: buffer,
                Key: id,
                ContentType: params.fileMimeType,
                Bucket: process.env.FILE_BUCKET_NAME,
                ACL: 'public-read',
            })
            .promise();

        await this.filesRepository.createFile(file);

        return file;
    }
}
