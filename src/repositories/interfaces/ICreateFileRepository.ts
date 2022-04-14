/* eslint-disable no-unused-vars */
import { File } from '../../entities/File';

export interface ICreateFileRepository {
    createFile(file: File): Promise<void>;
}
