export enum FileType {
    IMAGE = 'image',
    PDF = 'pdf',
}
export class File {
    public readonly fileId: string;
    public createdAt: Number;
    public readonly fileType: FileType;
    public url: string;

    constructor(
        fileId: string,
        fileType: FileType,
        url: string,
        createdAt?: Number,
    ) {
        this.fileId = fileId;
        this.fileType = fileType;
        this.createdAt = createdAt || Date.now();
        this.url = url;
    }
}

