import { FileType } from "../../entities/File";
import { constEnumType } from "../../../../utils/ConstEnumType";

export namespace CreateFileDTO {
    export type Params = {
        base64File: string;
        fileMimeType: string;
        fileType: constEnumType<typeof FileType>;
    };
}
