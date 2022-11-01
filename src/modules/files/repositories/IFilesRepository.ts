import { constEnumType } from '../../../utils/ConstEnumType';
import { File, FileType } from '../entities/File';

export type ListFilesInput = {
    type: constEnumType<typeof FileType>;
    lastFileId?: string;
    limit: number;
};

export interface IFilesRepository {
    listFiles(params: ListFilesInput): Promise<File[]>;

    deleteFile(id: string): Promise<void>;

    createFile(file: File): Promise<void>;
}
