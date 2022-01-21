import { verify } from 'jsonwebtoken';

class VerifyJWT {
    private secretKey: string = process.env.JWT_SECRET;

    private token: string;

    private option: string;

    constructor(token: string) {
        this.token = token;
    }

    public authenticate = (): boolean => {
        const  = verify(this.token, this.secretKey, { complete: false });
    };
}

export default VerifyJWT;
