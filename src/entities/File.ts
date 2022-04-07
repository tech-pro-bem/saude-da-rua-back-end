export enum FileType {
    IMAGE = 'image',
    PDF = 'pdf',
}
export class File {
    public readonly id: string;
    public createdAt: Number;
    public url: string;

    constructor(
        id: string,
        url: string,
    ) {
        this.id = id;
        this.createdAt = Date.now();
        this.url = url;
    }
}

