import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';

type AdminProps = {
    id?: string;

    name: string;

    email: string;

    passwordHash: string;

    createdAt?: number;

    updatedAt?: number;
};

class Admin {
    public readonly id: string;

    public readonly createdAt: number;

    public updatedAt: number;

    public email: string;

    public name: string;

    public passwordHash: string;

    public readonly permissionLevel = md5(process.env.TOKEN_ONE);

    constructor(props: AdminProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidv4(),
            createdAt: props.createdAt || Date.now(),
            updatedAt: props.updatedAt || Date.now(),
        });
    }
}

export { Admin };
