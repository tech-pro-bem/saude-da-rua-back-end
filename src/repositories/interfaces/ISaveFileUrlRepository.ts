/* eslint-disable no-unused-vars */
import { File } from '../../entities/File';

export interface ISaveFileUrlRepository {
    saveFileData(file: File): Promise<boolean | Error>;
}
