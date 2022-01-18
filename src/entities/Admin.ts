import { v4 as uuidv4 } from 'uuid';

import { hashSync } from 'bcryptjs';

class Admin {
    public readonly id?: string;

    public readonly createdAt?: Date;

    public readonly updatedAt?: Date;

    public email?: string;

    public username?: string;

    public password?: string;

    public readonly permissionLevel? = 2;

    constructor(
        props: Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>,

        id?: string,

        createdAt?: Date,

        updatedAt?: Date
    ) {
        if (id) this.id = uuidv4();

        if (createdAt) this.createdAt = new Date();

        if (updatedAt) this.updatedAt = new Date();

        this.email = props.email;

        this.username = props.username;

        this.password = hashSync(props.password);
    }
}

export default Admin;
