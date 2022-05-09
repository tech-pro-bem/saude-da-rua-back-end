/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

export enum FileType {
    IMAGE = 'image',

    PDF = 'pdf',
}

export enum AllowedMimes {
    IMAGE_JPEG = 'image/jpeg',

    IMAGE_JPG = 'image/jpg',

    IMAGE_PNG = 'image/png',

    APP_PDF = 'application/pdf',
}

export class File {
    public readonly fileId: string;

    public readonly fileType: FileType;

    public readonly createdAt: Number;

    public fileUrl: string;

    constructor(fileType: FileType, fileUrl: string) {
        this.fileId = uuidv4();
        this.createdAt = Date.now();

        this.fileType = fileType;
        this.fileUrl = fileUrl;
    }
}
