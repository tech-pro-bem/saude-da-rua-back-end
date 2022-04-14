/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

export enum FileType {
    IMAGE = 'image',
    PDF = 'pdf',
}
export class File {
    public readonly createdAt: Number;

    public readonly fileId: string;

    public readonly fileType: FileType;

    public url: string;

    constructor(fileType: FileType, url: string) {
        this.fileId = uuidv4();
        this.fileType = fileType;
        this.createdAt = Date.now();
        this.url = url;
    }
}
