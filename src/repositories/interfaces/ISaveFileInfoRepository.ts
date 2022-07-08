/* eslint-disable no-unused-vars */
import { File } from '../../entities/File';

export interface ISaveFileInfoRepository {
    saveFileData(file: File): Promise<boolean | Error>;
}
