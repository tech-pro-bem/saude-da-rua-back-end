export interface IDeleteFileRepository {
    deleteFile(fileId: string): Promise<void>;
}
