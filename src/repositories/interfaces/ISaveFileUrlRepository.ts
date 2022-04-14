/* eslint-disable no-unused-vars */
import { FileType } from '../../entities/File';

export interface ISaveFileUrlRepository {
    saveUrl(fileId: string, fileType: FileType): Promise<void>;
}
