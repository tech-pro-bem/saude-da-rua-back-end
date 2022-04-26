import { FileType } from '../../entities/File';

export namespace CreateFileDTO {
    export type Params = {
        base64File: string
        fileMimeType: string
        fileType: FileType
    }
}
