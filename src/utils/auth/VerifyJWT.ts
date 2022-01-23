import { verify } from 'jsonwebtoken';

class VerifyJWT {
    private secretKey: string = process.env.JWT_SECRET;

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public checkToken = (): boolean => {
        const checkToken = verify(this.token, this.secretKey);

        return !!checkToken;
    };
}

export default VerifyJWT;
