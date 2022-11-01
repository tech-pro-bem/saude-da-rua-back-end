import { File } from '../../entities/File';
import {
    IFilesRepository,
    ListFilesInput,
} from '../../repositories/IFilesRepository';

export class ListFilesUseCase {
    constructor(private filesRepository: IFilesRepository) {}

    public async execute(params: ListFilesInput): Promise<File[]> {
        return this.filesRepository.listFiles({
            type: params.type,
            limit: params.limit,
            lastFileId: params.lastFileId,
        });
    }
}
