export interface IDeleteFileInfoDatabaseRepository {
    deleteFileInfo(fileId: string): Promise<void | Error>;
}
