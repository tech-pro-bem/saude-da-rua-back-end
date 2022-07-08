import { File } from '../../entities/File';
import TListFilesDTO from './ListFilesDTO';
import { IListFilesInfoRepository } from '../../repositories/interfaces';

export class ListFilesUseCase {
    private listFileInfoRepository: IListFilesInfoRepository; 

    constructor(listFileInfoRepository: IListFilesInfoRepository) {
        this.listFileInfoRepository = listFileInfoRepository;
    }   

    async execute(listFilesRequestData: TListFilesDTO): Promise<Array<File> | Error>{
        const { fileType } = listFilesRequestData;

        const listFilesInfo: Promise<Array<File> | Error>  = 
            this.listFileInfoRepository.listFiles(fileType);

        return listFilesInfo;
    }
}