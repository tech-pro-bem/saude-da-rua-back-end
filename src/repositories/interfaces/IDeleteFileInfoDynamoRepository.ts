export interface IDeleteFileInfoDynamoRepository {
    deleteFileInfo(fileId: string): Promise<void | Error>;
}
