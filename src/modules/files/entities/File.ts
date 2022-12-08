import { v4 as uuidV4 } from 'uuid';
import { constEnumType } from '../../../utils/ConstEnumType';

export const FileType: { [x: string]: 'IMAGE' | 'PDF' } = {
    IMAGE: 'IMAGE',
    PDF: 'PDF',
};

interface TFileProps {
    id?: string;

    fileType: constEnumType<typeof FileType>;
    url: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class File {
    public readonly id: string;

    public readonly fileType: constEnumType<typeof FileType>;

    public url: string;

    public createdAt: Date;

    public name: string;

    constructor(props: TFileProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidV4(),
            createdAt: props.createdAt || new Date(),
        });
    }
}
