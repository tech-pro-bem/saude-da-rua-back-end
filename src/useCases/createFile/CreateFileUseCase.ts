import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { File } from '../../entities/File';
import { ICreateFileRepository, ISaveFileUrlRepository } from '../../repositories/interfaces';
import { CreateFileDTO } from './CreateFileDTO';
// import { ValidationError } from '../../helpers/errors';

class UploadFileUseCase {
    private createFileRepository: ICreateFileRepository;

    private saveFileUrlRepository: ISaveFileUrlRepository;

    constructor(
        createFileRepository: ICreateFileRepository,
        saveFileUrlRepository: ISaveFileUrlRepository
        ) {
            this.createFileRepository = createFileRepository;
            this.saveFileUrlRepository = saveFileUrlRepository;
    }

    async execute(params: CreateFileDTO.Params): Promise<File> {
        // Validação
        //if (!allowedMimes.includes(params.fileMimeType)) {
        //    throw new ValidationError('Invalid mime type');
        //}
        
        

        return file;
    }
}

export default UploadFileUseCase;
