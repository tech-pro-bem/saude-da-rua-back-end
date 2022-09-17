import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';

type TAdminProps = {
    id?: string;

    name: string;

    email: string;

    passwordHash: string;

    createdAt?: Number;

    updatedAt?: Number;
};

class Admin {
    public readonly id: string;

    public readonly createdAt: number;

    public updatedAt: number;

    public email: string;

    public name: string;

    public passwordHash: string;

    public readonly permissionLevel = md5(process.env.TOKEN_ONE);

    constructor(props: TAdminProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidv4(),
            createdAt: props.createdAt || Date.now(),
            updatedAt: props.updatedAt || Date.now(),
        });
    }
}

export default Admin;
