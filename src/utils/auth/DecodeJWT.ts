import { decode } from 'jsonwebtoken';

interface IDecoded {
    id: string;
    sub: string; // PermissionLevel está aqui
}

class DecodeJWT {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public catchPermissionAndIdAdmin = (): IDecoded => {
        const payload = decode(this.token, { json: true }) as IDecoded;

        return payload;
    };
}

export default DecodeJWT;
