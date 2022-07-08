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
    public createdAt: Number;

    public fileType: FileType;

    public fileId: string;

    public url: string;

    constructor(
        fileType: FileType,
        url: string,
        fileId?: string, 
        createdAt?: Number
        ) {
        if(!createdAt) {
            this.createdAt = Date.now();
        } else {
            this.createdAt = createdAt;
        }
        
        if(!fileId) {
            this.fileId = uuidv4();
        } else {
            this.fileId = fileId;
        }

        this.fileType = fileType;
        this.url = url;
    }
}
