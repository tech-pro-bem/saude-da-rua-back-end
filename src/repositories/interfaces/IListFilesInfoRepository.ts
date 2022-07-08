import { File, FileType } from "../../entities/File"

export interface IListFilesInfoRepository {
    listFiles(fileType: FileType): Promise<Array<File>>
}