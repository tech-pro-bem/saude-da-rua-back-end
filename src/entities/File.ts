import { v4 as uuidv4 } from 'uuid';

export enum FileType {
    IMAGE = 'image',
    PDF = 'pdf',
}
export class File {
    public readonly id: string;
    public createdAt: Number;
    public url: string;

    constructor(
        url: string,
        type: FileType,
    ) {
        this.id = `${type}#${uuidv4()}`;
        this.createdAt = Date.now();
        this.url = url;
    }
}

