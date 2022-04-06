import { File, FileType } from '../../entities/File';

export type ListFilesParams = {
  from: number
  to: number
  type: FileType
}

export interface IListFileRepository {
  listFiles(params: ListFilesParams): Promise<File[]>;
}
