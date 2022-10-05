import { File, FileType } from '../../entities/File';
import { constEnumType } from '../../utils/ConstEnumType';

export type ListFilesParams = {
    type: constEnumType<typeof FileType>;
    lastFileId?: string;
    limit: number;
};

export interface IListFileRepository {
    listFiles(params: ListFilesParams): Promise<File[]>;
}
