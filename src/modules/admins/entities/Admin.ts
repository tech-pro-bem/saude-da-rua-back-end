import { v4 as uuidv4 } from 'uuid';

type AdminProps = {
    id?: string;

    name: string;

    email: string;

    passwordHash: string;

    permissionLevel: string;

    createdAt?: Date;

    updatedAt?: Date;
};

export enum AdminPermissionLevels {
    Volunteer = '1',
    Admin = '2',
}

class Admin {
    public readonly id: string;

    public readonly createdAt: Date;

    public updatedAt: Date;

    public email: string;

    public name: string;

    public passwordHash: string;

    public readonly permissionLevel: string;

    constructor(props: AdminProps) {
        Object.assign(this, {
            ...props,
            id: props.id || uuidv4(),
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        });
    }
}

export { Admin };
