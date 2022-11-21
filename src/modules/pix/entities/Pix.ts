import { v4 as uuidV4 } from 'uuid';

interface IPixProps {
    id?: string;

    key: string;
}

export class Pix {
    public readonly id: string;

    public key: string;

    constructor(props: IPixProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidV4(),
        });
    }
}
