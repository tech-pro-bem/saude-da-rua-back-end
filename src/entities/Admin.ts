import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcryptjs';
import md5 from 'md5';

class Admin {
    public readonly id?: string;

    public readonly createdAt?: Number;

    public updatedAt?: Number;

    public email?: string;

    public name?: string;

    public password?: string;

    public readonly permissionLevel? = md5(process.env.TOKEN_ONE);

    constructor(
        email: string,
        name: string,
        password: string,
        updatedAt?: number
    ) {
        this.id = uuidv4();
        this.createdAt = Date.now();

        if (!updatedAt) this.updatedAt = Date.now();

        this.email = email;
        this.name = name;
        this.password = hashSync(password);
    }
}

export default Admin;
