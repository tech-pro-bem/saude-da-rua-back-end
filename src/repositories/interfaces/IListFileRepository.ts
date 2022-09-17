import { File, FileType } from '../../entities/File';
import { constEnumType } from '../../utils/ConstEnumType';

export type ListFilesParams = {
    from: number;
    to: number;
    type: constEnumType<typeof FileType>;
};
export interface IListFileRepository {
    listFiles(params: ListFilesParams): Promise<File[]>;
}
