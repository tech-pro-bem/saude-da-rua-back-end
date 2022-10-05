export interface IDeleteFileRepository {
    deleteFile(id: string): Promise<void>;
}
