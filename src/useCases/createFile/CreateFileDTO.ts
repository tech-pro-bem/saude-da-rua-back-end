import { FileType } from '../../entities/File';

export namespace CreateFileDTO {
    export type Params = {
        base64File: string;
        // Isso aqui pode ser tratado na validação né!?
        fileMimeType: string;
        fileType: FileType;
    };
}
