import { v4 as uuidv4 } from 'uuid';

import { hashSync } from 'bcryptjs';

class Admin {
    public readonly id?: string;

    public readonly createdAt?: Number;

    public readonly updatedAt?: Number;

    public email?: string;

    public username?: string;

    public password?: string;

    public readonly permissionLevel? = 2;

    constructor(email: string, username: string, password: string) {
        this.id = uuidv4();

        this.createdAt = Date.now();

        this.updatedAt = Date.now();

        this.email = email;

        this.username = username;

        this.password = hashSync(password);
    }
}

export default Admin;
