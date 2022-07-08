import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { File } from '../../entities/File';
import { IUploadFileRepository, ISaveFileInfoRepository } from '../../repositories/interfaces';
import { CreateFileDTO } from './CreateFileDTO';
import { InternalServerError } from '../../helpers/errors';
// import { ValidationError } from '../../helpers/errors';

class UploadFileUseCase {
    private uploadFileRepository: IUploadFileRepository;

    private saveFileUrlRepository: ISaveFileInfoRepository;

    constructor(
        createFileRepository: IUploadFileRepository,
        saveFileUrlRepository: ISaveFileInfoRepository
        ) {
            this.uploadFileRepository = createFileRepository;
            this.saveFileUrlRepository = saveFileUrlRepository;
    }

    async execute(params: CreateFileDTO.Params): Promise<string> {
        // Validação
        //if (!allowedMimes.includes(params.fileMimeType)) {
        //    throw new ValidationError('Invalid mime type');
        //}
        let newFile = new File(params.fileType);
        const bufferFile = Buffer.from(params.base64File, 'base64');
        
        const fileS3Url = await this.uploadFileRepository.uploadFile(
            newFile.fileId, newFile.fileType, bufferFile
        );

        if(fileS3Url instanceof Error) {
            throw new InternalServerError('There is an Error in our file bank providers');
        }

        newFile.fileUrl = fileS3Url;

        const saveFileInfoIntoDB = await this.saveFileUrlRepository.saveFileData(newFile);

        if(saveFileInfoIntoDB instanceof Error) {
            throw new InternalServerError('There is an Error in our database providers');
        }

        return fileS3Url;
    }
}

export default UploadFileUseCase;
