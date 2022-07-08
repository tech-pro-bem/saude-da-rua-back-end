/* eslint-disable no-unused-vars */
import { FileType } from '../../entities/File';

export interface IUploadFileRepository {
    uploadFile(fileId: string, fileType: FileType, data: Buffer): Promise<string | Error>;
}
