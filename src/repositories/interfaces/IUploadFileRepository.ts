/* eslint-disable no-unused-vars */
import { File } from '../../entities/File';

export interface IUploadFileRepository {
    uploadFile(file: File, data: Buffer): Promise<void | Error>;
}
