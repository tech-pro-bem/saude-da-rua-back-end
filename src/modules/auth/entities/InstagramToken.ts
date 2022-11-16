import { v4 as uuidV4 } from 'uuid';

interface IInstagramTokenProps {
    id?: string;

    longLivedToken: string;
}

export class InstagramToken {
    public readonly id: string;

    public longLivedToken: string;

    constructor(props: IInstagramTokenProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidV4(),
        });
    }
}
