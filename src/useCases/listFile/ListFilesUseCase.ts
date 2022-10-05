import {
    IListFileRepository,
    ListFilesParams,
} from '../../repositories/interfaces';
import { File } from '../../entities/File';

export class ListFilesUseCase {
    constructor(private listFileRepo: IListFileRepository) {}

    public async execute(params: ListFilesParams): Promise<File[]> {
        return this.listFileRepo.listFiles({
            type: params.type,
            limit: params.limit,
            lastFileId: params.lastFileId,
        });
    }
}
