import { IDeleteFileInfoDatabaseRepository, IDeleteFileRepository } from "../../repositories/interfaces";
import { DeleteFileDTO } from './DeleteFileDTO';

class DeleFileUseCase {
    private deteleFileRepository: IDeleteFileRepository;

    private deleteFileInfoRepository: IDeleteFileInfoDatabaseRepository;

    constructor(deleteFileRepo: IDeleteFileRepository, deleteFileInfoRepository: IDeleteFileInfoDatabaseRepository) {
        this.deteleFileRepository = deleteFileRepo;
        this.deleteFileInfoRepository = deleteFileInfoRepository;
    }

    public async execute(params: DeleteFileDTO.Params): Promise<void> {
        const { fileId } = params;

        await this.deteleFileRepository.deleteFile(fileId);

        await this.deleteFileInfoRepository.deleteFileInfo(fileId);
    }
}

export default DeleFileUseCase;